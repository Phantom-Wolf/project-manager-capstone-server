const NoteOneService = {
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

module.exports = NoteOneService;
