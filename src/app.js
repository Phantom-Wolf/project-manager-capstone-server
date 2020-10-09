// imports

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const usersRouter = require('./Users/users-router')
const authRouter = require('./auth/auth-router')
const projectsRouter = require('./Projects/projects-router')
const contributorRouter = require('./Contributor/contributor-router')
const parentTaskRouter = require('./ParentTask/parentTask-router')
const taskOneRouter = require('./TaskOne/taskOne-router')
const taskTwoRouter = require('./TaskTwo/taskTwo-router')
const taskThreeRouter = require('./TaskThree/taskThree-router')

const app = express();

// middleware

const morganOption = NODE_ENV === 'production' ? 'tiny' : 'common';
app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());

// body

app.get('/', (req, res) => {
	res.send('Hello, boilerplate!');
});

app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/projects", projectsRouter)
app.use("/api/contributor", contributorRouter)
app.use("/api/parentTask", parentTaskRouter)
app.use("/api/taskOne", taskOneRouter)
app.use("/api/taskTwo", taskTwoRouter)
app.use("/api/taskThree", taskThreeRouter)

// error handling

app.use(function errorHandler(error, req, res, next) {
	let response;
	if (NODE_ENV === 'production') {
		response = { error: { message: 'server error' } };
	} else {
		console.log(error);
		response = { message: error.message, error };
	}
	res.status(500).json(response);
});

module.exports = app;
