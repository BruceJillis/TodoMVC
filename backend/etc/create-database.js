// setup environment
require("dotenv").config();

const Todo = require("../app/models/todo");

let ps = [];
ps.push(Todo.sync({ "force": true }));

Promise.all(ps).then(function() {
  process.exit(0);
});