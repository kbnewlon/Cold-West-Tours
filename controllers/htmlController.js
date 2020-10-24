const express = require('express');
const router = express.Router();
const db = require('../models');

router.get("/", function (req, res) {
    res.render("index", {user: req.session.user});
});

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
        // Get all activities
        db.Activity.findAll({}).then(function (getActivityList) {
            // Create activity list 
            let activityList = [];
            getActivityList.forEach(function (activityEl) {
                activityList.push(activityEl.dataValues);
            })
            // Create resort object to be rendered
            const resortObj = {
                name: getResort.name,
                address: getResort.address,
                phone: getResort.phone,
                resortLat: getResort.lat,
                resortLon: getResort.lon,
                envToken: process.env.A_TOKEN,
                activityList: activityList,
                user: req.session.user
            }
            res.render("resort", resortObj);
        }).catch(err => {
            res.status(500).json(getActivityList)
        });
    }).catch(err => {
        res.status(500).json(getResort)
    });
});

router.get("/activity", function (req, res) {
    //let newString = process.env.A_TOKEN;
    //console.log(typeof newString);
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
            // Create activity object to be rendered
            const activityJson = {
                name: getActivity.name,
                resortList: resortList,
                user: req.session.user
            }
            res.render("activity", activityJson);
        }).catch(err => {
            res.status(500).json(getResortList);
        });
        // console.log(activityJson);
    }).catch(err => {
        res.status(500).json(getActivity)
    });
});

// Route to sign in
router.get("/signin", function (req, res) {
    res.render("signIn", {user: req.session.user});
});

// Route to sign up
router.get("/signup", function (req, res) {
    res.render("signUp", {user: req.session.user});
});

// Route to account page
router.get("/account", function (req, res) {
    // console.log("entered");
    db.Activity.findOne({
        where: {
            id: req.session.user.fav_activity
        }
    }).then(function (getActivity) {
        // console.log(getActivity);
        let activityObj = {
            name: ""
        }
        if(getActivity){
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
            if(getResort){
                resortObj = {
                    name: getResort.name,
                    url: getResort.url,
                    overview: getResort.overview
                }
            }
            res.render("account", {activity: activityObj, resort: resortObj, user: req.session.user });
        }).catch(err => {
            console.log("find resort: " + err);
            res.status(500).json("internal server error")
        });
    }).catch(err => {
        console.log("find activity: " + err);
        // console.log(err);
        res.status(500).json("internal server error")
    });
});

// Route to signout
router.get("/signout", function (req, res) {
    res.render("signOut", {user: req.session.user});
});


// router.get("/resort-activity/:id", function (req, res) {
//     db.Resort_Activity.findOne({
//         where: {
//             id: req.params.id
//         }
//     }).then(function (getActivityList) {
//         // const activityJson = {
//         //     name: getActivity.name
//         // }
//         // res.render("activity", activityJson);
//         // res.render(getActivityList);
//         console.log(getActivityList);
//     }).catch(err => {
//         res.status(500).json(getActivityList)
//     });
// });

router.get("/aboutus", function (req, res) {
    res.render("aboutUs", { user: req.session.user });
});

router.get("*", function (req, res) {
    res.render("index", {user: req.session.user});
});

module.exports = router;
