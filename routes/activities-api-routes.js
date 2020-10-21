// *********************************************************************************
// activities-api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
const { Sequelize } = require("../models");
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {
    // GET route for getting all of the activities
    app.get("/api/activities", function (req, res) {
        // Write code here to retrieve all of the activities from the database and res.json them
        // back to the user
        db.Activity.findAll({}).then(function (getActivity) {
            res.json(getActivity);
        }.catch(err => {
            res.status(500).json(getActivity)
        }));
    });

    // GET route for getting an activity by id
    app.get("/api/activities/:id", function (req, res) {
        // Write code here to retrieve one of the activities from the database and res.json them
        // back to the user
        db.Activity.findOne({ where: { id: req.param.id } }).then(function (getActivity) {
            res.json(getActivity);
        }.catch(err => {
            res.status(500).json(getActivity)
        }));
    });
};
