// import Sequelize
const Sequelize = require("sequelize");

// import environment variables
require("dotenv").config();

// create connectuon to MySQL
const sequelize = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PW,
	{
		host: "localhost",
		dialect: "mysql",
		port: 3306,
	}
);

module.exports = sequelize;
