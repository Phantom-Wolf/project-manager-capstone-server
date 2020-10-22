const ParentNoteService = {
	getAllParentNotes(knex, id) {
		return knex.from("parentnote").select("*").where("parent_id", id);
	},
	getParentNoteById(knex, id) {
		return knex.from("parentnote").select("*").where("id", id).first();
	},
	insertParentNote(knex, newParentNote) {
		return knex
			.insert(newParentNote)
			.into("parentnote")
			.returning("*")
			.then((rows) => {
				return rows[0];
			});
	},
	deleteParentNote(knex, id) {
		return knex.from("parentnote").where({ id }).delete();
	},
};

module.exports = ParentNoteService;
