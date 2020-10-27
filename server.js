// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
const express = require("express"); // npm install express
const exphbs = require("express-handlebars"); // npm install express-handlebars
const session = require("express-session"); // npm install express-session

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;
require('dotenv').config(); // npm install dotenv

// Requiring our models for syncing
var db = require("./models");


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// session setup for user checking
app.set(`trust proxy`, 1);

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 2*60*60*1000
    }
}));

// Routes/Controllers
// =============================================================
const resortRoutes = require('./controllers/resortController');
app.use("/api/resort",resortRoutes);
const activityRoutes = require('./controllers/activityController');
app.use("/api/activity",activityRoutes);
const userRoutes = require('./controllers/userController');
app.use("/user", userRoutes);
const htmlRoutes = require('./controllers/htmlController');
app.use(htmlRoutes);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({force: false}).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});
