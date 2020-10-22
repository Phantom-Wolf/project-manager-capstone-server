// service object

const TaskThreeService = {
	// tasks

	getAllTasks(knex, id) {
		return knex.from("taskthree").select("*").where("project_id", id);
	},
	getTaskById(knex, id) {
		return knex.from("taskthree").select("*").where("id", id).first();
	},
	insertTask(knex, newTask) {
		return knex
			.insert(newTask)
			.into("taskthree")
			.returning("*")
			.then((rows) => {
				return rows[0];
			});
	},
	deleteTask(knex, id) {
		return knex.from("taskthree").where({ id }).delete();
	},
	updateTask(knex, id, newTaskFields) {
		return knex.from("taskthree").where({ id }).update(newTaskFields);
	},

	// notes

	getAllNotes(knex, id) {
		return knex.from("noteThree").select("*").where("parent_id", id);
	},
	getNoteById(knex, id) {
		return knex.from("noteThree").select("*").where("id", id).first();
	},
	insertNote(knex, newNote) {
		return knex
			.insert(newNote)
			.into("noteThree")
			.returning("*")
			.then((rows) => {
				return rows[0];
			});
	},
	deleteNote(knex, id) {
		return knex.from("noteThree").where({ id }).delete();
	},
};

// export

module.exports = TaskThreeService;
