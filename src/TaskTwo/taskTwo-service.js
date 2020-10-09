// service object

const TaskTwoService = {
	// tasks

	getAllTasks(knex, id) {
		return knex.from("taskTwo").select("*").where("parent_id", id);
	},
	getTaskById(knex, id) {
		return knex.from("taskTwo").select("*").where("id", id).first();
	},
	insertTask(knex, newTask) {
		return knex
			.insert(newTask)
			.into("taskTwo")
			.returning("*")
			.then((rows) => {
				return rows[0];
			});
	},
	deleteTask(knex, id) {
		return knex.from("taskTwo").where({ id }).delete();
	},

	// notes

	getAllNotes(knex, id) {
		return knex.from("noteTwo").select("*").where("parent_id", id);
	},
	getNoteById(knex, id) {
		return knex.from("noteTwo").select("*").where("id", id).first();
	},
	insertNote(knex, newNote) {
		return knex
			.insert(newNote)
			.into("noteTwo")
			.returning("*")
			.then((rows) => {
				return rows[0];
			});
	},
	deleteNote(knex, id) {
		return knex.from("noteTwo").where({ id }).delete();
	},
};

// export

module.exports = TaskTwoService;
