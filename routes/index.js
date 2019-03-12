// uses express to route thru 
const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/User");
// routes
// root route
router.get("/", (req, res)=>{
    res.render("loginOrSignup", {title: "Log in or Sign up"});
});
//============
// auth routes
// ===========
// shows sign up page
router.get("/signup", (req, res)=>{
    res.render("signup", {title: "Sign Up", currentUser: req.user});
});
// posts to sign up page
router.post("/signup", (req, res)=>{
    const newUser = new User (
                                {
                                    username: req.body.username,
                                    realname: req.body.realname,
                                    avatar: req.body.avatar,
                                    email: req.body.email,
                                    bio: req.body.bio
                                }
                            );
    User.register(newUser, req.body.password, (err, user)=>{
        if(err){
            req.flash("error", err.message);
            res.render("signup");
        }
        passport.authenticate("local")(req, res, ()=>{
            req.flash("success", "Welxome to TwitClone " + req.body.username);
            res.redirect("/pops");
        });
    });
});
// shows login page
router.get("/login", (req, res)=>{
    res.render("login", {title: "Login", currentUser: req.user});
});
// posts to login page
router.post("/login", passport.authenticate("local",
        {
            successRedirect: "/pops",
            failureRedirect: "/login"}),
            (req, res)=>{
});
router.get("/logout", (req, res)=>{
    req.logout();
    res.redirect("/pops");
});
module.exports = router;