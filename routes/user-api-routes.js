// *********************************************************************************
// activities-api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
const { Sequelize } = require("../models");
const session = require("express-session"); // npm install
const bcrypt = require("bcrypt"); //npm install
var db = require("../models");

// Routes
// =============================================================
module.exports = function (app) {
    // GET route for getting all of the activities
    app.get("/api/signup", function (req, res) {
        // Write code here to retrieve all of the activities from the database and res.json them
        // back to the user
        db.User.create({
            email:req.body.email,
            password:req.body.password
        }).then(function (newUser) {
            res.json(newUser);
        }.catch(err => {
            res.status(500).json(newUser)
        }));
    });

    app.post(`/login`, function(req, res) {
        db.User.findOne({
            where: {email:req.body.email}
        }).then(function(user){
            if(!user){
                req.session.destroy();
                return res.status(401).send("incorrect username or password");
            }
            else if(bcrypt.compareSync(req.body.password, user.password)){
                req.session.user - {
                    email:user.email,
                    id:user.id
                }
                return res.status(200).json(req.session);
            }
            else{
                return res.status(401).send("incorrect username or password");
            }
        });
    });

    app.get(`/logout`, function (req, res) {
        req.session.destroy();
        return res.status(200).send("logged out");
    });

    // npm install express-session
    app.get(`/secretstuff`, function (req, res) {
        // Write code here to retrieve all of the activities from the database and res.json them
        // back to the user
        db.User.create({
            email:req.body.email,
            password:req.body.password
        }).then(function (newUser) {
            res.json(newUser);
        }.catch(err => {
            res.status(500).json(newUser)
        }));
    });

};
