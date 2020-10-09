// imports

const knex = require("knex");
const app = require("./app");
const { PORT, DATABASE_URL } = require("./config");

// server

const db = knex({
	client: "pg",
	connection: DATABASE_URL,
});

app.set("db", db);

// const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`Server listening at http://localhost:${PORT}`);
});
