// service object

const PendingService = {
	getAllPending(knex, id) {
		return knex.from("pending").select("*").where("user_id", id);
	},
	getPendingById(knex, id) {
		return knex.from("pending").select("*").where({ id }).first();
	},
	getUserByUsername(knex, username) {
		return knex.from("users").select("*").where({ username }).first();
	},
	insertPending(knex, newPending) {
		return knex
			.insert(newPending)
			.into("pending")
			.returning("*")
			.then((rows) => {
				return rows[0];
			});
	},
	deletePending(knex, id) {
		return knex.from("pending").where({ id }).delete();
	},
};

// export

module.exports = PendingService;
