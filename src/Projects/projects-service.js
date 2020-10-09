// service object

const ProjectsService = {
	getAllProjects(knex, id) {
		return knex.from("projects").select("*").where("user_id", id);
	},
	getProjectById(knex, id) {
		return knex.from("projects").select("*").where({ id }).first();
	},
	insertProject(knex, newProject) {
		return knex
			.insert(newProject)
			.into("projects")
			.returning("*")
			.then((rows) => {
				return rows[0];
			});
	},
	deleteProject(knex, id) {
		return knex.from("projects").where({ id }).delete();
	},
};

// export

module.exports = ProjectsService;
