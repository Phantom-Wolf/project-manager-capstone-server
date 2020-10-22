// imports

const express = require("express");
const { requireAuth } = require("../middleware/jwt-auth");
const xss = require("xss");
const TaskOneService = require("./taskOne-service");
const { json } = require("express");
const path = require("path");

// middleware

const taskOneRouter = express.Router();
const jsonParser = express.json();

const serializetask = (task) => ({
	id: task.id,
	parent_id: task.parent_id,
	project_id: task.project_id,
	title: xss(task.title),
	task_level: task.task_level,
	completion_status: task.completion_status,
});

const serializeNote = (taskNote) => ({
	id: taskNote.id,
	parent_id: taskNote.parent_id,
	user_id: taskNote.user_id,
	note: xss(taskNote.note),
	date_created: taskNote.date_created,
});

// routes

// ***** tasks *****

taskOneRouter
	.route("/")
	.all(requireAuth)
	.get((req, res, next) => {
		const { project_id } = req.body;
		TaskOneService.getAllTasks(req.app.get("db"), project_id).then((tasks) => {
			res.json(tasks.map(serializetask));
		});
	})
	.post(requireAuth, jsonParser, (req, res, next) => {
		const { parent_id, project_id, task_level, title, completion_status = false } = req.body;
		const newTask = { parent_id, project_id, task_level, title, completion_status };

		for (const [key, value] of Object.entries(newTask))
			if (value === null)
				return res.status(400).json({
					error: {
						message: `missing ${key} in request body`,
					},
				});

		TaskOneService.insertTask(req.app.get("db"), newTask)
			.then((task) => {
				res
					.status(201)
					.location(path.posix.join(req.originalUrl, `/${task.id}`))
					.json(serializetask(task));
			})
			.catch(next);
	});

taskOneRouter.route("/getAll").post(requireAuth, jsonParser, (req, res, next) => {
	const { project_id } = req.body;
	TaskOneService.getAllTasks(req.app.get("db"), project_id).then((tasks) => {
		res.json(tasks.map(serializetask));
	});
});

taskOneRouter
	.route("/:task_id")
	.all(requireAuth)
	.all((req, res, next) => {
		if (isNaN(parseInt(req.params.task_id))) {
			return res.status(404).json({
				error: { message: `Invalid id` },
			});
		}
		TaskOneService.getTaskById(req.app.get("db"), req.params.task_id)
			.then((task) => {
				if (!task) {
					return res.status(404).json({
						error: { message: `Task doesn't exist` },
					});
				}
				res.task = task;
				next();
			})
			.catch(next);
	})
	.get((req, res, next) => {
		res.json(serializetask(res.task));
	})
	.delete((req, res, next) => {
		TaskOneService.deleteTask(req.app.get("db"), req.params.task_id)
			.then((numbRowsAffected) => {
				res.status(204).end();
			})
			.catch(next);
	})
	.patch(jsonParser, (req, res, next) => {
		const { parent_id, project_id, task_level, title, completion_status } = req.body;
		const taskToUpdate = { parent_id, project_id, task_level, title, completion_status };

		const numberOfValues = Object.values(taskToUpdate).filter(Boolean).length;
		if (numberOfValues === 0) {
			return res.status(400).json({
				error: {
					message: `'Request body is missing values'`,
				},
			});
		}

		TaskOneService.updateTask(req.app.get("db"), req.params.task_id, taskToUpdate)
			.then((updatedTask) => {
				res.status(200).json();
			})
			.catch(next);
	});

// ***** notes *****

taskOneRouter
	.route("/notes")
	.get((req, res, next) => {
		const { parent_id } = req.body;
		TaskOneService.getAllNotes(req.app.get("db"), parent_id).then((Note) => {
			res.json(Note.map(serializeNote));
		});
	})
	.post(requireAuth, jsonParser, (req, res, next) => {
		const { parent_id, note, date_created } = req.body;
		const newNote = { parent_id, note, date_created };

		for (const [key, value] of Object.entries(newNote))
			if (value === null)
				return res.status(400).json({
					error: {
						message: `missing ${key} in request body`,
					},
				});

		newNote.user_id = req.user.id;

		TaskOneService.insertNote(req.app.get("db"), newNote)
			.then((Note) => {
				res
					.status(201)
					.location(path.posix.join(req.originalUrl, `/${Note.id}`))
					.json(serializeNote(Note));
			})
			.catch(next);
	});

taskOneRouter
	.route("/notes/:note_id")
	.all(requireAuth)
	.all((req, res, next) => {
		if (isNaN(parseInt(req.params.note_id))) {
			return res.status(404).json({
				error: { message: `Invalid id` },
			});
		}
		TaskOneService.getNoteById(req.app.get("db"), req.params.note_id)
			.then((Note) => {
				if (!Note) {
					return res.status(404).json({
						error: { message: `Note doesn't exist` },
					});
				}
				res.Note = Note;
				next();
			})
			.catch(next);
	})
	.get((req, res, next) => {
		res.json(serializeNote(res.Note));
	})
	.delete((req, res, next) => {
		TaskOneService.deleteNote(req.app.get("db"), req.params.note_id)
			.then((numbRowsAffected) => {
				res.status(204).end();
			})
			.catch(next);
	});

module.exports = taskOneRouter;
