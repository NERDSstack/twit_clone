// uses express to route thru app
const express = require("express");
const router =  express.Router();
const User = require("../models/User");
const Pops = require("../models/Pops");
// if there's a file name index in a folder you don't
// have to explicitly require it express does it automatically
const middleware = require("../middleware");


router.get("/profile/:id", (req, res)=>{
    User.findById(req.params.id, (err, foundUser)=>{
        if(err || !foundUser){
            req.flash("error", "User not found");
            res.redirect("/pops");
        }else{
            Pops.find().where("author.id").equals(foundUser._id).exec((err, pops)=>{
                if(err){
                    req.flash("error", "Something went wrong");
                    console.log("Error: " + err);
                    res.redirect("back");
                }else{
                    res.render("users/userprofile", {user: foundUser, title: foundUser.username, pops: pops});
                }
            });
        }
    });
});
router.get("/profile/:id/edit", (req, res)=>{
    User.findById(req.params.id,(err, foundUser)=>{
        if(err || !foundUser){
            res.redirect("back");
        }else{
            res.render("users/edit", {title: "Edit Your Profile", currentUser: req.user});
        }
    });
});
router.put("/profile/:id", (req, res)=>{
    let bio = req.sanitize(req.body.bio);
    let username = req.body.username;
    let realname = req.body.realname;
    User.findByIdAndUpdate(req.user.id, {bio, username, realname}, (err, updatedUser)=>{
        if(err){
            req.flash("error", "You can't do that");
            res.redirect("back");
        }else{
            req.flash("success", "Profile Updated")
            res.redirect("/pops");
        }
    });
});

module.exports = router;