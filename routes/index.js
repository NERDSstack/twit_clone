// uses express to route thru 
const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");
const indexRoutes = require("../controllers/indexController")
// routes
// root route
router.get("/", indexRoutes.loginOrSignup);
//============
// auth routes
// ===========
// shows sign up page
router.get("/signup", indexRoutes.registerPage);
// posts to sign up page
router.post("/signup", indexRoutes.register);
// shows login page
router.get("/login", indexRoutes.loginPage);
// posts to login page
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/pops",
        failureRedirect: "/login"
    }));
router.get("/logout", indexRoutes.logout);
module.exports = router;