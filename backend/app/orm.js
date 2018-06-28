const Sequelize = require("sequelize");
const winston = require("winston");

// setup mysql
const orm = new Sequelize("todos", process.env.DB_USER, process.env.DB_PASSWORD, {
  "host": process.env.DB_HOST,
  "dialect": "mysql",
  "operatorsAliases": false,
  "logging": winston.verbose
});

orm
  .authenticate()
  .then(() => {
    winston.verbose("Database connected.");
  })
  .catch(err => {
    winston.verbose("Unable to connect to the database:", err);
  });

module.exports = orm;
