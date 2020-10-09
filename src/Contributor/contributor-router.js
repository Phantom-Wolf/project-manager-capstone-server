// imports

const express = require("express");
const { requireAuth } = require("../middleware/jwt-auth");
const ContributorService = require("./contributor-service");
const { json } = require("express");
const path = require("path");

// middleware

const contributorRouter = express.Router();
const jsonParser = express.json();

// routes

contributorRouter
	.route("/")
	.all(requireAuth)
	.get((req, res, next) => {
		ContributorService.getAllContributors(req.app.get("db"), req.user.id).then((pending) => {
			res.json(pending);
		});
	})
	.post(requireAuth, jsonParser, (req, res, next) => {
		const { project_id } = req.body;
		const newContributor = { project_id };

		for (const [key, value] of Object.entries(newContributor))
			if (value === null)
				return res.status(400).json({
					error: {
						message: `missing ${key} in request body`,
					},
				});
		
		newContributor.user_id = req.user.id

		ContributorService.insertContributor(req.app.get("db"), newContributor)
			.then((contributor) => {
				res
					.status(201)
					.location(path.posix.join(req.originalUrl, `/${contributor.id}`))
					.json(contributor);
			})
			.catch(next);
	});

contributorRouter
	.route("/:contributor_id")
	.all(requireAuth)
	.all((req, res, next) => {
		if (isNaN(parseInt(req.params.contributor_id))) {
			return res.status(404).json({
				error: { message: `Invalid id` },
			});
		}
		ContributorService.getContributorById(req.app.get("db"), req.params.contributor_id)
			.then((contributor) => {
				if (!contributor) {
					return res.status(404).json({
						error: { message: `Contributor doesn't exist` },
					});
				}
				res.contributor = contributor;
				next();
			})
			.catch(next);
	})
	.get((req, res, next) => {
		res.json(contributor);
	})
	.delete((req, res, next) => {
		ContributorService.deleteContributor(req.app.get("db"), req.params.contributor_id)
			.then((numbRowsAffected) => {
				res.status(204).end();
			})
			.catch(next);
	});

	module.exports = contributorRouter
