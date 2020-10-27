// *********************************************************************************
// activities-api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
const express = require('express');
const router= express.Router();
const db = require("../models");

// Routes
// =============================================================

    // GET api route for getting all of the activities
    router.get("/", function (req, res) {
        db.Activity.findAll({}).then(function (getActivity) {
            res.json(getActivity);
        }.catch(err => {
            res.status(500).json(getActivity)
        }));
    });

    // GET api route for getting an activity by id
    router.get("/:id", function (req, res) {
        db.Activity.findOne({ where: { id: req.params.id } }).then(function (getActivity) {
            res.json(getActivity);
        }).catch(err => {
            res.status(500).json(getActivity)
        });
    });
    module.exports = router;
