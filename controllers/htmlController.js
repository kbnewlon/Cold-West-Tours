const express = require('express');
const router = express.Router();
const db = require('../models');

    router.get("/resort", function(req, res) {
        //let newString = process.env.A_TOKEN;
        //console.log(typeof newString);
        res.render("resort",{ envToken: process.env.A_TOKEN, user: req.session.user} );
    });
    
    router.get("/activity", function(req, res) {
        res.render("activity", { user: req.session.user });
    });
    
    router.get("/aboutus", function(req, res) {
        res.render("aboutUs", { user: req.session.user });
    });
    
    router.get("*", function(req, res) {
        res.render("index", { user: req.session.user });
    });

    module.exports = router;
