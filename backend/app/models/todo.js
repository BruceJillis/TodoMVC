const Sequelize = require("sequelize");
const ORM = require("../orm");

const Todo = ORM.define("todo", {
  "description": Sequelize.STRING,
  "done": { "type": Sequelize.BOOLEAN, "defaultValue": false }
});

module.exports = Todo;