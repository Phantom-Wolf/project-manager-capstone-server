// imports

const express = require("express");
const ParentNoteService = require("./parentNote-service");
const { requireAuth } = require("../middleware/jwt-auth");
const xss = require("xss");
const { json } = require("express");
const path = require("path");

// middleware

const parentNoteRouter = express.Router();
const jsonParser = express.json();

const serializeParentNote = (parentNote) => ({
	id: parentNote.id,
	parent_id: parentNote.parent_id,
	user_id: parentNote.user_id,
	note: xss(parentNote.note),
	date_created: parentNote.date_created,
});

//  routes

parentNoteRouter.route("/getAll").post(requireAuth, jsonParser, (req, res, next) => {
	const { parent_id } = req.body;

	console.log(parent_id);

	for (const [key, value] of Object.entries(parent_id))
		if (value == null)
			return res.status(400).json({
				error: `Missing '${key}' in request body`,
			});

	ParentNoteService.getAllParentNotes(req.app.get("db"), parent_id).then((parentNotes) => {
		res.json(parentNotes.map(serializeParentNote));
	});
});

parentNoteRouter.route("/").post(requireAuth, jsonParser, (req, res, next) => {
	const { parent_id, note, date_created } = req.body;
	const newParentNote = { parent_id, note, date_created };

	console.log(newParentNote);

	for (const [key, value] of Object.entries(newParentNote))
		if (value === null)
			return res.status(400).json({
				error: {
					message: `missing ${key} in request body`,
				},
			});

	newParentNote.user_id = req.user.id;

	ParentNoteService.insertParentNote(req.app.get("db"), newParentNote)
		.then((parentNote) => {
			res
				.status(201)
				.location(path.posix.join(req.originalUrl, `/${parentNote.id}`))
				.json(serializeParentNote(parentNote));
		})
		.catch(next);
});

parentNoteRouter
	.route("/:parentNote_id")
	.all(requireAuth)
	.all((req, res, next) => {
		if (isNaN(parseInt(req.params.parentNote_id))) {
			return res.status(404).json({
				error: { message: `Invalid id` },
			});
		}
		ParentNoteService.getParentNoteById(req.app.get("db"), req.params.parentNote_id)
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
		ParentNoteService.deleteParentNote(req.app.get("db"), req.params.parentNote_id)
			.then((numbRowsAffected) => {
				res.status(204).end();
			})
			.catch(next);
	});
module.exports = parentNoteRouter;
