const Sequelize = require("sequelize");

// setup mysql
const orm = new Sequelize("todos", "dbuser", "secret", {
  "host": "localhost",
  "dialect": "mysql"
});

orm
  .authenticate()
  .then(() => {
    console.log("Database connected.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = orm;
