// *********************************************************************************
// resort-api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
const express = require('express');
const router= express.Router();
const db = require("../models");

// Routes
// =============================================================


  // GET route for getting all of the resorts
  router.get("/", function (req, res) {
    // Write code here to retrieve all of the resorts from the database and res.json them
    // back to the user
    db.Resort.findAll({}).then(function (getResort) {
      res.json(getResort);
    }).catch(err=>{
      res.status(500).json(getResort)
    });
  });

  // GET route for getting a resort by id
  router.get("/:id", function (req, res) {
    // Write code here to retrieve one of the resorts from the database and res.json them
    // back to the user
    db.Resort.findOne({where: {id: req.param.id}}).then(function (getResort) {
      res.json(getResort);
    }).catch(err=>{
      res.status(500).json(getResort)
    });
  });
  module.exports = router;
