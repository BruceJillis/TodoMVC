const Todo = require("../models/todo");

const TodoController = function() {
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
  
  // public interface
  const interface = {
    // create a todo
    "create": function(req, res) {
      if (!req.body.description) {
        return handleError(res, 400, {
          "message": "Error: no description supplied!"
        });
      }
      Todo.create({
        "description": req.body.description,
        "done": req.body.done ? true : false
      })
        .then(function(todo) {
          res.json(todo);
        })
        .catch(handleError(res, 500));
    },
    "getAll": function(req, res) {
      Todo.findAll()
        .then(function(todos) {
          res.json(todos);
        })
        .catch(handleError(res, 500));
    },
    "getById": function(req, res) {
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
    },
    "updateById": function(req, res) {
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
    },
    "deleteById": function(req, res) {
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
    }
  };
  return interface;
};

module.exports = new TodoController();
  