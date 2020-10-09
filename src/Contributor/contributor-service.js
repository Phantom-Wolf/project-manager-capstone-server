// service object

const ContributorService = {
	getAllContributors(knex, id) {
		return knex.from("contributor").select("*").where("user_id", id);
	},
	getContributorById(knex, id) {
		return knex.from("contributor").select("*").where({ id }).first();
	},
	getContributorsByProjectId(knex, project_id) {
		// knex raw is sql query which needs to be excuted by knex without any shortcuts (ex:.select('*') .where('recipes.id', recipes_id))
        // joining contributor table and users table
        // input is project_id
        // table connection is contributor.user_id = users.id (co.user_id = us.id)
        // output is contributor user_id and username

        return knex.raw(`
                SELECT	
                    us.id, us.username
                FROM 
                    contributor co
                LEFT JOIN 
                    users us 
                ON 
					co.user_id = us.id
                WHERE 
                    co.project_id = ${project_id};
                `);
		// return knex.from("contributor").select("*").where({ project_id })
	},
	insertContributor(knex, newContributor) {
		return knex
			.insert(newContributor)
			.into("contributor")
			.returning("*")
			.then((rows) => {
				return rows[0];
			});
	},
	deleteContributor(knex, id) {
		return knex.from("contributor").where({ id }).delete();
	},
};

// export

module.exports = ContributorService;
