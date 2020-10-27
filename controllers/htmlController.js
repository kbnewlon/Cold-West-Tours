const express = require('express');
const router = express.Router();
const db = require('../models');

// Route to homepage
router.get("/", function (req, res) {
    res.render("index", {user: req.session.user});
});

// Test page for resort, shouldn't be pulled up under normal behaviour
router.get("/resort", function (req, res) {
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

// GET route to get resort page by resort id 
router.get("/resort/:id", function (req, res) {
    db.Resort.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (getResort) {
        // Get all activities
        db.Activity.findAll({}).then(function (getActivityList) {
            // Create activity list 
            let activityList = [];
            getActivityList.forEach(function (activityEl) {
                activityList.push(activityEl.dataValues);
            });

            let checkFav = false;
            // If user is signed in and current resort matches user favorite resort
            if (req.session.user && req.params.id === req.session.user.fav_resort) {
                    checkFav = true; 
            }

            // Create resort object to be rendered
            const resortObj = {
                pic1: getResort.pic1,
                pic2: getResort.pic2,
                pic3: getResort.pic3,
                pic4: getResort.pic4,
                pic5: getResort.pic5,
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
        .catch(err => {
            res.status(500).json(getActivityList)
        });
    })
    .catch(err => {
        res.status(500).json(getResort)
    });
});

// Test page for activity, shouldn't be pulled up under normal behaviour 
router.get("/activity", function (req, res) {
    res.render("activity", { user: req.session.user });
});

// GET route to get activity by id 
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
        .catch(err => {
            res.status(500).json(getResortList);
        });
    }).catch(err => {
        res.status(500).json(getActivity)
    });
});

// GET route to sign in page
router.get("/signin", function (req, res) {
    res.render("signIn", {user: req.session.user});
});

// GET route to sign up page
router.get("/signup", function (req, res) {
    res.render("signUp", {user: req.session.user});
});

// GET route to account page
router.get("/account", function (req, res) {
    if(req.session.user){
        db.Activity.findOne({
            where: {
                id: req.session.user.fav_activity
            }
        }).then(function (getActivity) {
            let activityObj = {
                name: "",
                img: ""
            }

            if((getActivity) && (getActivity !== null)){
                activityObj = {
                    name: getActivity.name,
                    img: getActivity.actImage,
                    about: getActivity.about
                }
            }

            db.Resort.findOne({
                where: {
                    id: req.session.user.fav_resort
                }
            }).then(function (getResort) {
                let resortObj = {
                    name: "",
                    img: "",
                    url: "",
                    overview: ""
                }

                if((getResort) && (getResort !== null)){
                    resortObj = {
                        name: getResort.name,
                        img: getResort.pic1,
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
    }
    else{
        res.render("index");
    }
});

// GET route to sign out page
router.get("/signout", function (req, res) {
    res.render("signOut", {user: req.session.user});
});

// GET route to about us page
router.get("/aboutus", function (req, res) {
    res.render("aboutUs", { user: req.session.user });
});

// GET route to homepage if url not found above
router.get("*", function (req, res) {
    res.render("index", {user: req.session.user});
});

module.exports = router;
