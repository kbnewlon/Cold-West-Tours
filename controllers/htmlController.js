const express = require('express');
const router = express.Router();
const db = require('../models');

    router.get("/resort", function(req, res) {
        //let newString = process.env.A_TOKEN;
        //console.log(typeof newString);
        res.render("resort",{ envToken: process.env.A_TOKEN} );
    });
    
    router.get("/resorts/:id", function (req, res) {
        // Write code here to retrieve one of the resorts from the database and res.json them
        // back to the user
        db.Resort.findOne({ where: { id: req.params.id } })
        .then(function (getResort) {
            // res.json(getResort);
            const resortJson = {
                name: getResort.name,
                address: getResort.address,
                phone: getResort.phone
            }
            res.render("resort", resortJson);
        }).catch(err => {
            res.status(500).json(getResort)
        });
    });
    
    router.get("/activity", function(req, res) {
        res.render("activity");
    });
    
    router.get("/aboutus", function(req, res) {
        res.render("aboutUs");
    });
    
    router.get("*", function(req, res) {
        res.render("index");
    });
    module.exports = router;
