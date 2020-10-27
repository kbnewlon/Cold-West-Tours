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


  // GET api route for getting all of the resorts
  router.get("/", function (req, res) {
    db.Resort.findAll({}).then(function (getResort) {
      res.json(getResort);
    }).catch(err=>{
      res.status(500).json(getResort)
    });
  });

  // GET api route for getting a resort by id
  router.get("/:id", function (req, res) {
    db.Resort.findOne({where: {id: req.params.id}}).then(function (getResort) {
      res.json(getResort);
    }).catch(err=>{
      res.status(500).json(getResort)
    });
  });
  module.exports = router;
