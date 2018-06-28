const Sequelize = require("sequelize");
const ORM = require("../orm");

const Todo = ORM.define("todo", {
  "description": Sequelize.STRING,
  "done": Sequelize.BOOLEAN
});
Todo.sync({ "force": true });

module.exports = Todo;
