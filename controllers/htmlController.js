const express = require('express');
const router = express.Router();
const db = require('../models');

    router.get("/resort", function(req, res) {
        //let newString = process.env.A_TOKEN;
        //console.log(typeof newString);
        res.render("resort",{ envToken: process.env.A_TOKEN} );
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
