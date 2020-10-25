const express = require('express');
const router = express.Router();
const db = require('../models');

// Route to homepage
router.get("/", function (req, res) {
    res.render("index", {user: req.session.user});
});

// Test page for resort
router.get("/resort", function (req, res) {
    //let newString = process.env.A_TOKEN;
    //console.log(typeof newString);
    const defaultObj = {
        name: "Mini Mountain Indoor Ski Center",
        address: "1900 132nd Ave NE a3, Bellevue, WA 98005",
        phone: "425.746.7547",
        resortLat: 47.6245138,
        resortLon: -122.1650769,
        envToken: process.env.A_TOKEN,
        user: req.session.user
    }
    res.render("resort", defaultObj);
});

// Route to get resort by id 
router.get("/resort/:id", function (req, res) {
    db.Resort.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (getResort) {
        // console.log(getResort)
        // Get all activities
        db.Activity.findAll({}).then(function (getActivityList) {
            // Create activity list 
            let activityList = [];
            getActivityList.forEach(function (activityEl) {
                activityList.push(activityEl.dataValues);
            })

            let checkFav = false;
            // If user is signed in and current resort matches user favorite resort
            if (req.session.user && req.params.id === req.session.user.fav_resort) {
                    checkFav = true; 
            }

            // Create resort object to be rendered
            const resortObj = {
                name: getResort.name,
                address: getResort.address,
                phone: getResort.phone,
                resortLat: getResort.lat,
                resortLon: getResort.lon,
                policy: getResort.policy,
                overview: getResort.overview,
                envToken: process.env.A_TOKEN,
                id: getResort.id,
                activityList: activityList,
                checkFav: checkFav,
                user: req.session.user
            }
            res.render("resort", resortObj);
        })
        // .catch(err => {
        //     res.status(500).json(getActivityList)
        // });
    })
    .catch(err => {
        res.status(500).json(getResort)
    });
});

router.get("/activity", function (req, res) {
    res.render("activity", { user: req.session.user });
});

// Route to get activity by id 
router.get("/activity/:id", function (req, res) {
    db.Activity.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (getActivity) {
        // Get all resorts
        db.Resort.findAll({}).then(function (getResortList) {
            // Create resort list 
            let resortList = [];
            getResortList.forEach(function (resortEl) {
                resortList.push(resortEl.dataValues);
            });
            
            let checkFav = false;
            // If user is signed in and current activity matches user favorite activity
            if (req.session.user && req.params.id === req.session.user.fav_activity) {
                    checkFav = true; 
            }

            // Create activity object to be rendered
            const activityJson = {
                name: getActivity.name,
                about: getActivity.about,
                guide: getActivity.guide,
                actImage: getActivity.actImage,
                id: getActivity.id,
                resortList: resortList,
                checkFav: checkFav,
                user: req.session.user
            }
            res.render("activity", activityJson);
        })
        // .catch(err => {
        //     res.status(500).json(getResortList);
        // });
    }).catch(err => {
        res.status(500).json(getActivity)
    });
});

// Route to sign in page
router.get("/signin", function (req, res) {
    res.render("signIn", {user: req.session.user});
});

// Route to sign up page
router.get("/signup", function (req, res) {
    res.render("signUp", {user: req.session.user});
});

// Route to account page
router.get("/account", function (req, res) {
    db.Activity.findOne({
        where: {
            id: req.session.user.fav_activity
        }
    }).then(function (getActivity) {
        let activityObj = {
            name: ""
        }
        if((getActivity) && (getActivity !== null)){
            activityObj = {
                name: getActivity.name
            }
        }
        db.Resort.findOne({
            where: {
                id: req.session.user.fav_resort
            }
        }).then(function (getResort) {
            let resortObj = {
                name: "",
                url: "",
                overview: ""
            }
            if((getResort) && (getResort !== null)){
                resortObj = {
                    name: getResort.name,
                    url: getResort.url,
                    overview: getResort.overview
                }
            }
            res.render("account", {activity: activityObj, resort: resortObj, user: req.session.user });
        }).catch(err => {
            res.status(500).json("internal server error")
        });
    }).catch(err => {
        res.status(500).json("internal server error")
    });
});

// Route to sign out page
router.get("/signout", function (req, res) {
    res.render("signOut", {user: req.session.user});
});

// Route to about us page
router.get("/aboutus", function (req, res) {
    res.render("aboutUs", { user: req.session.user });
});

// Route to homepage if url not found above
router.get("*", function (req, res) {
    res.render("index", {user: req.session.user});
});

module.exports = router;
