// service object

const ParentTaskService = {
	// tasks

	getAllParentTasks(knex, id) {
		return knex.from("parentTask").select("*").where("project_id", id);
	},
	getParentTaskById(knex, id) {
		return knex.from("parentTask").select("*").where("id", id).first();
	},
	insertParentTask(knex, newParentTask) {
		return knex
			.insert(newParentTask)
			.into("parentTask")
			.returning("*")
			.then((rows) => {
				return rows[0];
			});
	},
	deleteParentTask(knex, id) {
		return knex.from("parentTask").where({ id }).delete();
	},

	// notes

	getAllParentNotes(knex, id) {
		return knex.from("parentNote").select("*").where("parent_id", id);
	},
	getParentNoteById(knex, id) {
		return knex.from("parentNote").select("*").where("id", id).first();
	},
	insertParentNote(knex, newParentNote) {
		return knex
			.insert(newParentNote)
			.into("parentNote")
			.returning("*")
			.then((rows) => {
				return rows[0];
			});
	},
	deleteParentNote(knex, id) {
		return knex.from("parentNote").where({ id }).delete();
	},

};

// export

module.exports = ParentTaskService;