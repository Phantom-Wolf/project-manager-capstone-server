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
			project_name: "test1"
		},
		{
			id: 2,
			user_id: 1,
			project_name: "test2"
		},
		{
			id: 3,
			user_id: 1,
			project_name: "test3"
		},
	];


	before("make knex instance", () => {
		db = knex({
			client: "pg",
			connection: TEST_DATABASE_URL,
		});
		app.set("db", db);
	});

	before("cleanup", () => db.raw(	"TRUNCATE TABLE notethree, taskthree, notetwo, tasktwo, noteone,taskone,parentnote,parenttask,projects,users RESTART IDENTITY CASCADE;"));

	afterEach("cleanup", () =>
		db.raw(	"TRUNCATE TABLE notethree, taskthree, notetwo, tasktwo, noteone,taskone,parentnote,parenttask,projects,users RESTART IDENTITY CASCADE;")
	);

	after("disconnect from db", () => db.destroy());

	describe("GET all projects", () => {
		context(`Given no project`, () => {
			beforeEach("insert users", () => {
				return db.into("users").insert(testUsers);
			});

			it(`responds with 200 and an empty list`, () => {
				return supertest(app)
					.get("/api/projects")
					.set(
						"Authorization",
						`bearer ${AuthService.createJwt(testUser.user_email, { user_id: testUser.id })}`
					)
					.expect(200, []);
			});
		});

		context("Given there are projects in the database", () => {
			beforeEach("insert projects", () => {
				return db
					.into("users")
					.insert(testUsers)
					.then(() => {
						return db.into("projects").insert(testProjects);
					});
			});

			
			it("responds with 200 and all of the projects", () => {
				return supertest(app)
					.get("/api/projects")
					.set(
						"Authorization",
						`bearer ${AuthService.createJwt(testUser.user_email, { user_id: testUser.id })}`
					)
					.expect(200);
			});
		});
	});
});
