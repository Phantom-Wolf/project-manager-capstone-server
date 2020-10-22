// service object

const ParentTaskService = {
	// tasks

	getAllTasks(knex, id) {
		return knex.from("parenttask").select("*").where("project_id", id);
	},
	getParentTaskById(knex, id) {
		return knex.from("parenttask").select("*").where("id", id).first();
	},
	insertParentTask(knex, newParentTask) {
		return knex
			.insert(newParentTask)
			.into("parenttask")
			.returning("*")
			.then((rows) => {
				return rows[0];
			});
	},
	deleteParentTask(knex, id) {
		return knex.from("parenttask").where({ id }).delete();
	},
	updateTask(knex, id, newTaskFields) {
		return knex.from("parenttask").where({ id }).update(newTaskFields);
	},
};

// export

module.exports = ParentTaskService;