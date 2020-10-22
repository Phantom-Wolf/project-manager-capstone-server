// imports

const express = require("express");
const { requireAuth } = require("../middleware/jwt-auth");
const xss = require("xss");
const ProjectsService = require("./projects-service");
const { json } = require("express");
const path = require("path");

// middleware

const projectsRouter = express.Router();
const jsonParser = express.json();

const serializeProject = (project) => ({
	id: project.id,
	user_id: project.user_id,
	project_name: xss(project.project_name),
});

// routes

projectsRouter
	.route("/")
	.all(requireAuth)
	.get((req, res, next) => {
		ProjectsService.getAllProjects(req.app.get("db"), req.user.id).then((projects) => {
			res.json(projects.map(serializeProject));
		});
	})
	.post(requireAuth, jsonParser, (req, res, next) => {
		console.log(req.body);
		const { project_name } = req.body;
		const newProject = { project_name };

		console.log(newProject);

		for (const [key, value] of Object.entries(newProject))
			if (value === null)
				return res.status(400).json({
					error: {
						message: `missing ${key} in request body`,
					},
				});

		newProject.user_id = req.user.id;

		console.log(newProject);
		ProjectsService.insertProject(req.app.get("db"), newProject)
			.then((project) => {
				res
					.status(201)
					.location(path.posix.join(req.originalUrl, `/${project.id}`))
					.json(serializeProject(project));
			})
			.catch(next);
	});

projectsRouter
	.route("/:project_id")
	.all(requireAuth)
	.all((req, res, next) => {
		if (isNaN(parseInt(req.params.project_id))) {
			return res.status(404).json({
				error: { message: `Invalid id` },
			});
		}
		ProjectsService.getProjectById(req.app.get("db"), req.params.project_id)
			.then((project) => {
				if (!project) {
					return res.status(404).json({
						error: { message: `Project doesn't exist` },
					});
				}
				res.project = project;

				next();
			})
			.catch(next);
	})
	.get((req, res, next) => {
		res.json(serializeProject(res.project));
	})
	.delete((req, res, next) => {
		console.log(req.params.project_id);
		ProjectsService.deleteProject(req.app.get("db"), req.params.project_id)
			.then((numbRowsAffected) => {
				res.status(204).end();
			})
			.catch(next);
	});

module.exports = projectsRouter;
