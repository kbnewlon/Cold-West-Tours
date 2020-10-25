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
    router.post(`/signup`, function (req, res) {
        // Write code here to retrieve all of the activities from the database and res.json them
        // back to the user
        db.User.create({
            username:req.body.username,
            password:req.body.password,
            fav_activity: req.body.fav_activity||null,
            fav_resort: req.body.fav_resort||null
        }).then(function (newUser) {
            req.session.user = {
                id: newUser.id,
                username: newUser.username,
                fav_activity: newUser.fav_activity,
                fav_resort: newUser.fav_resort
            }
            //res.json(newUser);
            res.redirect("/account");
        }).catch(err => {
            if(err.errors[0].message === "users.username must be unique"){
                //res.status(422).json("that username already exists");
                res.status(422);
                res.render("signUp", {error: {message: "That username already exists"}});
            }
            else if(err.errors[0].message === "Validation is on username failed"){
                //res.status(422).json("username must only contain letters and numbers");
                res.status(422);
                res.render("signUp", {error: {message: "Username must only contain letters and numbers"}});
            }
            else if(err.errors[0].message === "Validation len on username failed"){
                //res.status(422).json("username must be between 4 and 24 characters");
                res.status(422);
                res.render("signUp", {error: {message: "Username must be between 4 and 24 characters"}});
            }
            else if(err.errors[0].message === "Validation is on password failed"){
                //res.status(422).json("password must only contain letters and numbers");
                res.status(422);
                res.render("signUp", {error: {message: "Password must only contain letters and numbers"}});
            }
            else if(err.errors[0].message === "Validation len on password failed"){
                //res.status(422).json("password must be between 6 and 24 characters");
                res.status(422);
                res.render("signUp", {error: {message: "Password must be between 6 and 24 characters"}});
            }
            else{
                res.status(500).json("internal server error");
            }
        });
    });

    router.post(`/login`, function(req, res) {
        db.User.findOne({
            where: {username: req.body.username}
        }).then(function(user){
            if(!user){
                req.session.destroy();
                //res.status(401).send("incorrect username or password");
                res.status(401);
                res.render("signIn", {error: {message: "Incorrect username or password"}});
            }
            else if(bcrypt.compareSync(req.body.password, user.password)){
                req.session.user = {
                    id: user.id,
                    username: user.username,
                    fav_activity: user.fav_activity,
                    fav_resort: user.fav_resort
                }
                //return res.status(200).json(req.session);
                // console.log("redirect wrong");
                return res.redirect("/account");
            }
            else{
                req.session.destroy();
                //res.status(401).send("incorrect username or password");
                res.status(401);
                res.render("signIn", {error: {message: "Incorrect username or password"}});
            }
        });
    });

    router.get(`/logout`, function (req, res) {
        req.session.destroy();
        res.redirect("/signOut");
    });

    router.get("/api/session", (req, res) => {
        res.json(req.session);
    });

    router.put("/:id", function (req, res) {
        if(req.session.user){
            db.User.findOne({
                where:{id: req.params.id}
            }).then( function (user){
                if(!user){
                    return res.status(404).send("user not found")
                }
                else{
                    db.User.update({
                        fav_activity: req.body.fav_activity||null,
                        fav_resort: req.body.fav_resort||null
                    }, {
                        where: {
                            id: req.params.id
                        }
                    }).then( function (editUser) {
                        req.session.user = {
                            id: user.id,
                            username: user.username,
                            fav_activity: req.body.fav_activity||null,
                            fav_resort: req.body.fav_resort||null
                        }
                        res.json(editUser);
                        
                    }).catch( function (err) {
                        res.status(500).send("ERROR ERROR ERROR!");
                    });
                }
            });
        }
        else{
            res.status(401).send("not logged in");
        }
    });

    module.exports = router;
