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
// router.get("/profile/:id/edit", (req, res)=>{
//     User.findById(req.params.id,(err, foundUser)=>{
//         if(err || !foundUser){
//             res.redirect("back");
//         }else{
//             res.render("users/edit", {title: "Edit Your Profile", currentUser: req.user});
//         }
//     });
// });
// router.put("/profile/:id", (req, res)=>{
//     bioSanitizer = req.sanitize(req.body.user);
//     User.findByIdAndUpdate(req.body.user._id, bioSanitizer,(err, updatedUser)=>{
//         if(err){
//             req.flash("error", "You can't do that");
//             res.redirect("back");
//         }else{
//             req.flash("success", "Profile Updated")
//             res.redirect("/profile/" + req.user._id, {currentUser: req.user});
//         }
//     });
// });

module.exports = router;