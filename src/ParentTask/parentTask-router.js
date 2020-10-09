// imports

const express = require("express");
const ParentTaskService = require("./parentTask-service");
const { requireAuth } = require("../middleware/jwt-auth");
const xss = require("xss");
const { json } = require("express");
const path = require("path");

// middleware

const parentTaskRouter = express.Router();
const jsonParser = express.json();

const serializeParentTask = (parentTask) => ({
	id: parentTask.id,
	project_id: parentTask.project_id,
	title: xss(parentTask.title),
	completion_status: parentTask.completion_status,
});

const serializeParentNote = (parentNote) => ({
	id: parentNote.id,
	parent_id: parentNote.parent_id,
	user_id: parentNote.user_id,
	note: xss(parentNote.note),
	date_created: parentNote.date_created,
});

//  routes 

// ***** tasks *****

parentTaskRouter
	.route("/")
	// .all(requireAuth)
	.get((req, res, next) => {
		const { project_id } = req.body;
		ParentTaskService.getAllparentTasks(req.app.get("db"), project_id).then((parentTask) => {
			res.json(parentTask.map(serializeParentTask));
		});
	})
	.post(requireAuth, jsonParser, (req, res, next) => {
		const { title, project_id, completion_status = false } = req.body;
		const newParentTask = { title, project_id, completion_status };

		for (const [key, value] of Object.entries(newParentTask))
			if (value === null)
				return res.status(400).json({
					error: {
						message: `missing ${key} in request body`,
					},
				});

		ParentTaskService.insertParentTask(req.app.get("db"), newParentTask)
			.then((parentTask) => {
				res
					.status(201)
					.location(path.posix.join(req.originalUrl, `/${parentTask.id}`))
					.json(serializeParentTask(parentTask));
			})
			.catch(next);
	});

parentTaskRouter
	.route("/:parentTask_id")
	.all(requireAuth)
	.all((req, res, next) => {
		if (isNaN(parseInt(req.params.parentTask_id))) {
			return res.status(404).json({
				error: { message: `Invalid id` },
			});
		}
		ParentTaskService.getParentTaskById(req.app.get("db"), req.params.parentTask_id)
			.then((parentTask) => {
				if (!parentTask) {
					return res.status(404).json({
						error: { message: `Parent Task doesn't exist` },
					});
				}
				res.parentTask = parentTask;
				next();
			})
			.catch(next);
	})
	.get((req, res, next) => {
		res.json(serializeParentTask(res.parentTask));
	})
	.delete((req, res, next) => {
		ParentTaskService.deleteParentTask(req.app.get("db"), req.params.parentTask_id)
			.then((numbRowsAffected) => {
				res.status(204).end();
			})
			.catch(next);
	});
	
	// ***** notes *****

	parentTaskRouter
	.route("/notes")
	.get((req, res, next) => {
		const { parent_id } = req.body;
		ParentTaskService.getAllparentNotes(req.app.get("db"), parent_id).then((parentNote) => {
			res.json(parentNote.map(serializeParentNote));
		});
	})
	.post(requireAuth, jsonParser, (req, res, next) => {
		const { parent_id, note, date_created } = req.body;
		const newParentNote = { parent_id, note, date_created };

		for (const [key, value] of Object.entries(newParentNote))
			if (value === null)
				return res.status(400).json({
					error: {
						message: `missing ${key} in request body`,
					},
				});
		
		newParentNote.user_id = req.user.id;

		ParentTaskService.insertParentNote(req.app.get("db"), newParentNote)
			.then((parentNote) => {
				res
					.status(201)
					.location(path.posix.join(req.originalUrl, `/${parentNote.id}`))
					.json(serializeParentNote(parentNote));
			})
			.catch(next);
	});

	parentTaskRouter
	.route("/notes/:parentNote_id")
	.all(requireAuth)
	.all((req, res, next) => {
		if (isNaN(parseInt(req.params.parentNote_id))) {
			return res.status(404).json({
				error: { message: `Invalid id` },
			});
		}
		ParentTaskService.getParentNoteById(req.app.get("db"), req.params.parentNote_id)
			.then((parentNote) => {
				if (!parentNote) {
					return res.status(404).json({
						error: { message: `Note doesn't exist` },
					});
				}
				res.parentNote = parentNote;
				next();
			})
			.catch(next);
	})
	.get((req, res, next) => {
		res.json(serializeParentNote(res.parentNote));
	})
	.delete((req, res, next) => {
		ParentTaskService.deleteParentNote(req.app.get("db"), req.params.parentNote_id)
			.then((numbRowsAffected) => {
				res.status(204).end();
			})
			.catch(next);
	});

	module.exports = parentTaskRouter