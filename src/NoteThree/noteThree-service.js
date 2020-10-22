const NoteThreeService = {
	getAllNotes(knex, id) {
		return knex.from("notethree").select("*").where("parent_id", id);
	},
	getNoteById(knex, id) {
		return knex.from("notethree").select("*").where("id", id).first();
	},
	insertNote(knex, newNote) {
		return knex
			.insert(newNote)
			.into("notethree")
			.returning("*")
			.then((rows) => {
				return rows[0];
			});
	},
	deleteNote(knex, id) {
		return knex.from("notethree").where({ id }).delete();
	},
};

module.exports = NoteThreeService;
