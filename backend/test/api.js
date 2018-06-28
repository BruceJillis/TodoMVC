/* eslint-env mocha */
require("dotenv").config();
process.env.NODE_ENV = "test";

const Todo = require("../app/models/todo");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

chai.should();
chai.use(chaiHttp);

// counter to generate nice todo descriptions
let counter = 0;

// describe todos
describe("/api/todos", function() {
  before(function(done) {  
    Todo.destroy({"where": {}}).then(function () {
      done();
    });
  });

  // test get todos
  describe("GET / - get all todos", function() {
    it("it should return no todos", function(done) {
      chai
        .request(server)
        .get("/api/todos")
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  // test create todo
  describe("POST / - create todos", function() {
    it("it should not create a todo without the description field", function(done) {
      chai.request(server)
        .post("/api/todos")
        .send({})
        .end(function(err, res) {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("message");
          res.body.message.should.include("description");
          done();
        });
    });

    it("it should create a todo without the done field", function(done) {
      let description = `Test todo #${counter++}`;
      chai.request(server)
        .post("/api/todos")
        .send({"description": description})
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("description");
          res.body.description.should.eql(description);
          done();
        });
    });   
    
    it("it should create a todo with the done field", function(done) {
      let description = `Test todo #${counter++}`;
      chai.request(server)
        .post("/api/todos")
        .send({"description": description, "done": true})
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("description");
          res.body.description.should.eql(description);
          res.body.should.have.property("done");
          res.body.done.should.eql(true);
          done();
        });
    });   
    
    it("it should return 2 todos", function(done) {
      chai
        .request(server)
        .get("/api/todos")
        .end(function(err, res) {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(2);
          done();
        });
    });

    
  });  
});