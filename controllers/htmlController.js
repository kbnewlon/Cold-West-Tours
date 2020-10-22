const express = require('express');
const router = express.Router();
const db = require('../models');

router.get("/", function (req, res) {
    res.render("index");
});

router.get("/resort", function (req, res) {
    //let newString = process.env.A_TOKEN;
    //console.log(typeof newString);
    res.render("resort", { envToken: process.env.A_TOKEN });
});

// Route to get resort by id and render to html
router.get("/resort/:id", function (req, res) {

    db.Resort.findOne({
        where: {
            id: req.params.id
        }
    }).then(function (getResort) {
        const resortJson = {
            name: getResort.name,
            address: getResort.address,
            phone: getResort.phone,
            envToken: process.env.A_TOKEN,
            user: req.session.user
        }
        res.render("resort", resortJson);
    }).catch(err => {
        res.status(500).json(getResort)
    });
});

router.get("/activity", function (req, res) {
    //let newString = process.env.A_TOKEN;
    //console.log(typeof newString);
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
        res.render("activity", activityJson);
    }).catch(err => {
        res.status(500).json(getActivity)
    });
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

// router.get("*", function (req, res) {
//     res.render("index");
// });

module.exports = router;
