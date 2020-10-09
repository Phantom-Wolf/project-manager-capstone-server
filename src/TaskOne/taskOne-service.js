// service object

const TaskOneService = {
	// tasks

	getAllTasks(knex, id) {
		return knex.from("taskOne").select("*").where("parent_id", id);
	},
	getTaskById(knex, id) {
		return knex.from("taskOne").select("*").where("id", id).first();
	},
	insertTask(knex, newTask) {
		return knex
			.insert(newTask)
			.into("taskOne")
			.returning("*")
			.then((rows) => {
				return rows[0];
			});
	},
	deleteTask(knex, id) {
		return knex.from("taskOne").where({ id }).delete();
	},

	// notes

	getAllNotes(knex, id) {
		return knex.from("noteOne").select("*").where("parent_id", id);
	},
	getNoteById(knex, id) {
		return knex.from("taskTwo").select("*").where("id", id).first();
	},
	insertNote(knex, newNote) {
		return knex
			.insert(newNote)
			.into("taskOne")
			.returning("*")
			.then((rows) => {
				return rows[0];
			});
	},
	deleteNote(knex, id) {
		return knex.from("noteOne").where({ id }).delete();
	},
};

// export

module.exports = TaskOneService;
