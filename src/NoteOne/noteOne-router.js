// imports

const express = require("express");
const NoteOneService = require("./noteOne-service");
const { requireAuth } = require("../middleware/jwt-auth");
const xss = require("xss");
const { json } = require("express");
const path = require("path");

// middleware

const noteOneRouter = express.Router();
const jsonParser = express.json();

const serializeNote = (note) => ({
	id: note.id,
	parent_id: note.parent_id,
	user_id: note.user_id,
	note: xss(note.note),
	date_created: note.date_created,
});

//  routes

noteOneRouter.route("/getAll").post(requireAuth, jsonParser, (req, res, next) => {
	const { parent_id } = req.body;

	console.log(parent_id);

	for (const [key, value] of Object.entries(parent_id))
		if (value == null)
			return res.status(400).json({
				error: `Missing '${key}' in request body`,
			});

            NoteOneService.getAllNotes(req.app.get("db"), parent_id).then((notes) => {
		res.json(notes.map(serializeNote));
	});
});

noteOneRouter.route("/").post(requireAuth, jsonParser, (req, res, next) => {
	const { parent_id, note, date_created } = req.body;
	const newNote = { parent_id, note, date_created };

	console.log(newNote);

	for (const [key, value] of Object.entries(newNote))
		if (value === null)
			return res.status(400).json({
				error: {
					message: `missing ${key} in request body`,
				},
			});

            newNote.user_id = req.user.id;

	NoteOneService.insertNote(req.app.get("db"), newNote)
		.then((note) => {
			res
				.status(201)
				.location(path.posix.join(req.originalUrl, `/${note.id}`))
				.json(serializeNote(note));
		})
		.catch(next);
});

noteOneRouter
	.route("/:note_id")
	.all(requireAuth)
	.all((req, res, next) => {
		if (isNaN(parseInt(req.params.note_id))) {
			return res.status(404).json({
				error: { message: `Invalid id` },
			});
		}
		NoteOneService.getNoteById(req.app.get("db"), req.params.note_id)
			.then((note) => {
				if (!note) {
					return res.status(404).json({
						error: { message: `Note doesn't exist` },
					});
				}
				res.note = note;
				next();
			})
			.catch(next);
	})
	.get((req, res, next) => {
		res.json(serializeNote(res.note));
	})
	.delete((req, res, next) => {
		NoteOneService.deleteNote(req.app.get("db"), req.params.note_id)
			.then((numbRowsAffected) => {
				res.status(204).end();
			})
			.catch(next);
	});
module.exports = noteOneRouter;
