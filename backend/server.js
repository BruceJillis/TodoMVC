// setup environment
require("dotenv").config();

// require libraries
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const winston = require("winston");
const expressWinston = require("express-winston");
const TodoController = require("./app/controllers/todo");

// setup constants
const port = process.env.PORT;

// setup express
let app = express();
app.use(
  bodyParser.urlencoded({
    "extended": true
  })
);
app.use(bodyParser.json({ "type": "application/json" }));
app.use(cors());
// surpress logging when testing
if (process.env.NODE_ENV !== "test") {
  app.use(expressWinston.logger({
    "transports": [
      new winston.transports.Console({
        "colorize": true
      })
    ],
    "meta": true, 
    "expressFormat": true, 
    "colorize": true    
  }));
}

// setup routes
const router = express.Router();

// setup routes
// default route
router.get("/", function(req, res) {
  res.json({
    "message": "Welcome to the todo API."
  });
});

// todo specific routes
router
  .route("/todos")
  .post(TodoController.create)
  .get(TodoController.getAll);

router
  .route("/todos/:todo_id")
  .get(TodoController.getById)
  .put(TodoController.updateById)
  .delete(TodoController.deleteById);

// start app
app.use("/api", router);
app.listen(port);

// for testing
module.exports = app;
