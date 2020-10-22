require("dotenv").config();
const knex = require("knex");
const app = require("../src/app");
const { TEST_DATABASE_URL } = require("../src/config");
const jwt = require("jsonwebtoken");
const AuthService = require("../src/auth/auth-service");

describe("Events Endpoints", function () {
	let db;

	const testUsers = [
		{
			id: 1,
			username: "test1",
			user_email: "test1@outlook.com",
			user_password: "Password1!",
		},
		{
			id: 2,
			username: "test2",
			user_email: "test2@outlook.com",
			user_password: "Password1!",
		},
		{
			id: 3,
			username: "test3",
			user_email: "test3@outlook.com",
			user_password: "Password1!",
		},
	];
	const testUser = testUsers[0];

	const testProjects = [
		{
			id: 1,
			user_id: 1,
			project_name: "test1",
		},
		{
			id: 2,
			user_id: 1,
			project_name: "test2",
		},
		{
			id: 3,
			user_id: 1,
			project_name: "test3",
		},
	];

	const testTasks0 = [
		{
			id: 1,
			project_id: 1,
			title: "test1",
			task_level: 0,
			completion_status: false,
		},
		{
			id: 2,
			project_id: 1,
			title: "test2",
			task_level: 0,
			completion_status: false,
		},
		{
			id: 3,
			project_id: 1,
			title: "test3",
			task_level: 0,
			completion_status: false,
		},
	];

	const testTasks1 = [
		{
			id: 1,
			project_id: 1,
			parent_id: 1,
			title: "test1",
			task_level: 0,
			completion_status: false,
		},
		{
			id: 2,
			project_id: 1,
			parent_id: 1,
			title: "test2",
			task_level: 0,
			completion_status: false,
		},
		{
			id: 3,
			project_id: 1,
			parent_id: 1,
			title: "test3",
			task_level: 0,
			completion_status: false,
		},
	];

	const testNotes1 = [
		{
			id: 1,
			parent_id: 1,
			user_id: 1,
			note: "notes1",
			date_created: "2020-08-21T01:00:24.900Z",
		},
		{
			id: 2,
			parent_id: 1,
			user_id: 1,
			note: "notes2",
			date_created: "2020-08-22T01:00:24.900Z",
		},
		{
			id: 3,
			parent_id: 1,
			user_id: 1,
			note: "notes3",
			date_created: "2020-08-23T01:00:24.900Z",
		},
	];

	before("make knex instance", () => {
		db = knex({
			client: "pg",
			connection: TEST_DATABASE_URL,
		});
		app.set("db", db);
	});

	before("cleanup", () =>
		db.raw(
			"TRUNCATE TABLE notethree, taskthree, notetwo, tasktwo, noteone,taskone,parentnote,parenttask,projects,users RESTART IDENTITY CASCADE;"
		)
	);

	afterEach("cleanup", () =>
		db.raw(
			"TRUNCATE TABLE notethree, taskthree, notetwo, tasktwo, noteone,taskone,parentnote,parenttask,projects,users RESTART IDENTITY CASCADE;"
		)
	);

	after("disconnect from db", () => db.destroy());

	describe("GET all noteOne", () => {
		context(`Given no noteOne`, () => {
			beforeEach("insert noteOne", () => {
				return db
					.into("users")
					.insert(testUsers)
					.then(() => {
						return db.into("projects").insert(testProjects);
					})
					.then(() => {
						return db.into("parenttask").insert(testTasks0);
					})
					.then(() => {
						return db.into("taskone").insert(testTasks1);
					});
			});

			it(`responds with 200 and an empty list`, () => {
				return supertest(app)
					.post("/api/noteOne/getAll")
					.set(
						"Authorization",
						`bearer ${AuthService.createJwt(testUser.user_email, { user_id: testUser.id })}`
					)
					.send({ parent_id: testTasks1[0].id })
					.expect(200, []);
			});
		});

		context("Given there are noteOne in the database", () => {
			beforeEach("insert noteOne", () => {
				return db
					.into("users")
					.insert(testUsers)
					.then(() => {
						return db.into("projects").insert(testProjects);
					})
					.then(() => {
						return db.into("parenttask").insert(testTasks0);
					})
					.then(() => {
						return db.into("taskone").insert(testTasks1);
					})
					.then(() => {
						return db.into("noteone").insert(testNotes1);
					});
			});

			it("responds with 200 and all of the noteOne", () => {
				return supertest(app)
					.post("/api/noteOne/getAll")
					.set(
						"Authorization",
						`bearer ${AuthService.createJwt(testUser.user_email, { user_id: testUser.id })}`
					)
					.send({ parent_id: testTasks1[0].id })
					.expect(200);
			});
		});
	});
});
