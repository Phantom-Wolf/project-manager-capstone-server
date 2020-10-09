// imports

const express = require("express");
const { requireAuth } = require("../middleware/jwt-auth");
const PendingService = require("./pending-service");
const { json } = require("express");
const path = require("path");

// middleware

const pendingRouter = express.Router();
const jsonParser = express.json();



// routes

pendingRouter
	.route("/")
	.all(requireAuth)
	.get((req, res, next) => {
		PendingService.getAllProjects(req.app.get("db"), req.user.id).then((pending) => {
			res.json(pending);
		});
	})
	.post(requireAuth, jsonParser, (req, res, next) => {
		const { user_id, project_id } = req.body;
		const newPending = { user_id, project_id };

		for (const [key, value] of Object.entries(newPending))
			if (value === null)
				return res.status(400).json({
					error: {
						message: `missing ${key} in request body`,
					},
				});

		PendingService.insertPending(req.app.get("db"), newPending)
			.then((pending) => {
				res
					.status(201)
					.location(path.posix.join(req.originalUrl, `/${pending.id}`))
					.json(pending);
			})
			.catch(next);
	});

    pendingRouter
	.route("/:pending_id")
	.all(requireAuth)
	.all((req, res, next) => {
		if (isNaN(parseInt(req.params.pending_id))) {
			return res.status(404).json({
				error: { message: `Invalid id` },
			});
		}
		PendingService.getPendingById(req.app.get("db"), req.params.pending_id)
			.then((pending) => {
				if (!pending) {
					return res.status(404).json({
						error: { message: `Pending request doesn't exist` },
					});
				}
				res.pending = pending;
				next();
			})
			.catch(next);
	})
	.get((req, res, next) => {
		res.json(pending);
	})
	.delete((req, res, next) => {
		PendingService.deletePending(req.app.get("db"), req.params.pending_id)
			.then((numbRowsAffected) => {
				res.status(204).end();
			})
			.catch(next);
	});

	module.exports = pendingRouter
