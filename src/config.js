module.exports = {
	PORT: process.env.PORT || 8000,
	NODE_ENV: process.env.NODE_ENV || 'development',
	DATABASE_URL:
	process.env.DATABASE_URL || "postgresql://postgres@localhost/project-manager",
TEST_DATABASE_URL:
	process.env.TEST_DATABASE_URL ||
	"postgresql://postgres@localhost/project-manager-test",
JWT_SECRET: process.env.JWT_SECRET || "my-own-special-jwt-secret",
};
