const NoteTwoService = {
	getAllNotes(knex, id) {
		return knex.from("notetwo").select("*").where("parent_id", id);
	},
	getNoteById(knex, id) {
		return knex.from("notetwo").select("*").where("id", id).first();
	},
	insertNote(knex, newNote) {
		return knex
			.insert(newNote)
			.into("notetwo")
			.returning("*")
			.then((rows) => {
				return rows[0];
			});
	},
	deleteNote(knex, id) {
		return knex.from("notetwo").where({ id }).delete();
	},
};

module.exports = NoteTwoService;
