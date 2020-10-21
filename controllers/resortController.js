// *********************************************************************************
// resort-api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
const { Sequelize } = require("../models");
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {

  // GET route for getting all of the resorts
  app.get("/api/resorts", function (req, res) {
    // Write code here to retrieve all of the resorts from the database and res.json them
    // back to the user
    db.Resort.findAll({}).then(function (getResort) {
      res.json(getResort);
    }.catch(err=>{
      res.status(500).json(getResort)
    }));
  });

  // GET route for getting a resort by id
  app.get("/api/resorts/:id", function (req, res) {
    // Write code here to retrieve one of the resorts from the database and res.json them
    // back to the user
    db.Resort.findOne({where: {id: req.param.id}}).then(function (getResort) {
      res.json(getResort);
    }.catch(err=>{
      res.status(500).json(getResort)
    }));
  });
};
