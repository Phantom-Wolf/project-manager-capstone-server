// imports

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const usersRouter = require("./Users/users-router");
const authRouter = require("./auth/auth-router");
const projectsRouter = require("./Projects/projects-router");
const parentTaskRouter = require("./ParentTask/parentTask-router");
const parentNoteRouter = require("./parentNote/parentNote-router");
const taskOneRouter = require("./TaskOne/taskOne-router");
const noteOneRouter = require("./NoteOne/noteOne-router");
const taskTwoRouter = require("./TaskTwo/taskTwo-router");
const noteTwoRouter = require("./NoteTwo/noteTwo-router");
const taskThreeRouter = require("./TaskThree/taskThree-router");
const noteThreeRouter = require("./NoteThree/noteThree-router");

const app = express();

// middleware

const morganOption = NODE_ENV === "production" ? "tiny" : "common";
app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());

// body

app.get("/", (req, res) => {
	res.send("Hello, boilerplate!");
});

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/projects", projectsRouter);
app.use("/api/parentTask", parentTaskRouter);
app.use("/api/parentNote", parentNoteRouter);
app.use("/api/taskOne", taskOneRouter);
app.use("/api/noteOne", noteOneRouter);
app.use("/api/taskTwo", taskTwoRouter);
app.use("/api/noteTwo", noteTwoRouter);
app.use("/api/taskThree", taskThreeRouter);
app.use("/api/noteThree", noteThreeRouter);

// error handling

app.use(function errorHandler(error, req, res, next) {
	let response;
	if (NODE_ENV === "production") {
		response = { error: { message: "server error" } };
	} else {
		console.log(error);
		response = { message: error.message, error };
	}
	res.status(500).json(response);
});

module.exports = app;
