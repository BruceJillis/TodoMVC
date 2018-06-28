// require libraries
const express = require("express");
const bodyParser = require("body-parser");
const Todo = require("./app/models/todo");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// setup constants
const port = process.env.PORT || 8080;

// setup express
let app = express();
app.use(
  bodyParser.urlencoded({
    "extended": true
  })
);
app.use(bodyParser.json());

// setup routes
let router = express.Router();

// route error handler for use in a promise or execute it synchronously if the error is already supplied
function handleError(res, status, err) {
  const handler = function(err) {
    res.status(status);
    res.send(err);
  };
  if (!err) {
    return handler;
  } else {
    handler(err);
  }
}

// test route
router.get("/", function(req, res) {
  res.json({
    "message": "welcome to our todo api"
  });
});

//
router
  .route("/todos")
  // create a todo
  .post(function(req, res) {
    console.log(req.body.description);
    Todo.findOrCreate({
      "where": {
        "description": {
          [Op.eq]: req.body.description
        }
      },
      "defaults": { "description": req.body.description }
    })
      .spread(function(todo) {
        res.json(todo);          
      })
      .catch(handleError(res, 500));
  })
  // get all the todos
  .get(function(req, res) {
    Todo.findAll()
      .then(function(todos) {
        res.json(todos);
      })
      .catch(handleError(res, 500));
  });

router
  .route("/todos/:todo_id")
  // get todo with id
  .get(function(req, res) {
    Todo.findById(req.params.todo_id)
      .then(function(todo) {
        if (todo == null) {
          handleError(res, 400, {
            "message": "Todo not found!"
          });
        } else {
          res.json(todo);
        }
      })
      .catch(handleError(res, 500));
  })
  // update todo with id
  .put(function(req, res) {
    Todo.findById(req.params.todo_id)
      .then(function(todo) {
        if (todo == null) {
          handleError(res, 400, {
            "message": "Todo not found!"
          });
        } else {
          todo.description = req.body.description;
          return todo.save().then(function(todo) {
            res.json(todo);
          });  
        }
      })
      .catch(handleError(res, 500));
  })
  // delete todo with id
  .delete(function(req, res) {
    Todo.findById(req.params.todo_id)
      .then(function(todo) {
        if (todo == null) {
          handleError(res, 400, {
            "message": "Todo not found!"
          });
        } else {
          todo.destroy();
          res.send({
            "message": "Todo destroyed!"
          });  
        }
      })
      .catch(handleError(res, 500));
  });

// start app
app.use("/api", router);
app.listen(port);

console.log(`started listening on port ${port}`);
