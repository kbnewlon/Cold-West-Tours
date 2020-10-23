const express = require('express');
const router = express.Router();
const db = require('../models');

router.get("/", function (req, res) {
    res.render("index");
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
        user: req.session.user,
    }
    res.render("resort", defaultObj);
});

// Route to get resort by id and render to html
router.get("/resort/:id", function (req, res) {

    db.Resort.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (getResort) {
        // console.log(getResort);
        db.Activity.findAll({}).then(function (getActivityList) {
            // console.log(getActivityList);
            let activityList = [];
            getActivityList.forEach(function (activityEl) {
                // console.log(activityEl);
                activityList.push(activityEl.dataValues);
            })
            console.log(activityList);
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
        })
        .catch(err => {
            res.status(500).json(getActivity)
        });
    })
    .catch(err => {
        res.status(500).json(getResort)
    });
});

router.get("/activity", function (req, res) {
    //let newString = process.env.A_TOKEN;
    //console.log(typeof newString);
    // db.Activity.findAll({}).then(function (getActivityList) {
    //     const activityJson = {
    //         activityList: getActivityList,
    //         user: req.session.user
    //     }
    // })
    res.render("activity", { user: req.session.user });
});

// Route to get activity by id and render to html
router.get("/activity/:id", function (req, res) {
    db.Activity.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (getActivity) {
        const activityJson = {
            name: getActivity.name,
            user: req.session.user
        }
        console.log(activityJson);
        res.render("activity", activityJson);
    }).catch(err => {
        res.status(500).json(getActivity)
    });
});

// Route to sign in
router.get("/signin", function (req, res) {
    res.render("signIn");
});

// Route to sign up
router.get("/signup", function (req, res) {
    res.render("signUp");
});

// Route to account page
router.get("/account", function (req, res) {
    res.render("account");
});

// Route to signout
router.get("/signout", function (req, res) {
    res.render("signOut");
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
    res.render("index");
});

module.exports = router;
