// *********************************************************************************
// activities-api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
const express = require("express"); // npm install express
const router = express.Router();
const bcrypt = require("bcrypt"); //npm install bcrypt
const db = require("../models");

// Routes
// =============================================================

    // GET route for getting all of the activities
    router.get(`/api/signup`, function (req, res) {
        // Write code here to retrieve all of the activities from the database and res.json them
        // back to the user
        db.User.create({
            name:req.body.name,
            password:req.body.password
        }).then(function (newUser) {
            res.json(newUser);
        }).catch(err => {
            res.status(500).json(newUser)
        });
    });

    router.post(`/login`, function(req, res) {
        db.User.findOne({
            where: {name:req.body.name}
        }).then(function(user){
            if(!user){
                req.session.destroy();
                return res.status(401).send("incorrect username or password");
            }
            else if(bcrypt.compareSync(req.body.password, user.password)){
                req.session.user - {
                    name:user.name,
                    id:user.id
                }
                return res.status(200).json(req.session);
            }
            else{
                return res.status(401).send("incorrect username or password");
            }
        });
    });

    router.get(`/logout`, function (req, res) {
        req.session.destroy();
        return res.status(200).send("logged out");
    });

    module.exports = router;
