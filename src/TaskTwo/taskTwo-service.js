// service object

const TaskTwoService = {
	// tasks

	getAllTasks(knex, id) {
		return knex.from("tasktwo").select("*").where("project_id", id);
	},
	getTaskById(knex, id) {
		return knex.from("tasktwo").select("*").where("id", id).first();
	},
	insertTask(knex, newTask) {
		return knex
			.insert(newTask)
			.into("tasktwo")
			.returning("*")
			.then((rows) => {
				return rows[0];
			});
	},
	deleteTask(knex, id) {
		return knex.from("tasktwo").where({ id }).delete();
	},
	updateTask(knex, id, newTaskFields) {
		return knex.from("tasktwo").where({ id }).update(newTaskFields);
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
