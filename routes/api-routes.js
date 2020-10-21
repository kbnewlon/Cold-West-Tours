// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
const { Sequelize } = require("../models");
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

//   // GET route for getting all of the todos
//   app.get("/api/todos", function (req, res) {
//     // Write code here to retrieve all of the todos from the database and res.json them
//     // back to the user
//     db.Todo.findAll({}).then(function (getTodo) {
//       res.json(getTodo);
//     }.catch(err=>{
//       res.status(500).json(getTodo)
//     }));
//   });
  
//   //accessing Todo Model with db.Todo
//   // POST route for saving a new todo. We can create todo with the data in req.body
//   app.post("/api/todos", function (req, res) {
//     // Write code here to create a new todo and save it to the database
//     db.Todo.create({
//       text: req.body.text,
//       complete: req.body.complete
//     }).then(function (postTodo) {
//       // and then res.json back the new todo to the user
//       res.json(postTodo);
//     }.catch(err=>{
//       res.status(500).json(postTodo)
//     }
//     ));
//   });

//   // DELETE route for deleting todos. We can get the id of the todo to be deleted from
//   // req.params.id
//   app.delete("/api/todos/:id", function (req, res) {
//     db.Todo.destroy({
//       where: {
//         id: req.params.id
//       }
//     }).then(function (delTodo) {
//       res.status(200).json(delTodo);
//     }).catch(err=>{
//       console.log(err)
//       res.status(500).json(err)
//     })
//   });

//   // PUT route for updating todos. We can get the updated todo data from req.body
//   app.put("/api/todos", function (req, res) {
//     db.Todo.update({
//       text: req.body.text,
//       complete: req.body.complete
//     }, {
//       where: {
//         id: req.text
//       }
//     }).then(function (updateTodo) {
//       res.status(200).json(updateTodo);
//     }).catch(err=>{
//       console.log(err)
//       res.status(500).json(updateTodo)
//     })
//   });
};
