// service object

const TaskOneService = {
	// tasks

	getAllTasks(knex, id) {
		return knex.from("taskone").select("*").where("project_id", id);
	},
	getTaskById(knex, id) {
		return knex.from("taskone").select("*").where("id", id).first();
	},
	insertTask(knex, newTask) {
		return knex
			.insert(newTask)
			.into("taskone")
			.returning("*")
			.then((rows) => {
				return rows[0];
			});
	},
	deleteTask(knex, id) {
		return knex.from("taskone").where({ id }).delete();
	},
	updateTask(knex, id, newTaskFields) {
		return knex.from("taskone").where({ id }).update(newTaskFields);
	},

	// notes

	getAllNotes(knex, id) {
		return knex.from("noteone").select("*").where("parent_id", id);
	},
	getNoteById(knex, id) {
		return knex.from("noteone").select("*").where("id", id).first();
	},
	insertNote(knex, newNote) {
		return knex
			.insert(newNote)
			.into("noteone")
			.returning("*")
			.then((rows) => {
				return rows[0];
			});
	},
	deleteNote(knex, id) {
		return knex.from("noteone").where({ id }).delete();
	},
};

// export

module.exports = TaskOneService;
