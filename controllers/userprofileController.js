const User = require("../models/User");
const Pops = require("../models/Pops");

exports.getProfile = (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        if (err || !foundUser) {
            req.flash("error", "User not found");
            res.redirect("/pops");
        } else {
            Pops.find().where("author.id").equals(foundUser._id).exec((err, pops) => {
                if (err) {
                    req.flash("error", "Something went wrong");
                    console.log("Error: " + err);
                    res.redirect("back");
                } else {
                    res.render("users/userprofile", { user: foundUser, title: foundUser.username, pops: pops });
                }
            });
        }
    });
}
exports.editProfile = (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        if (err || !foundUser) {
            res.redirect("back");
        } else {
            res.render("users/edit", { title: "Edit Your Profile", currentUser: req.user });
        }
    });
}
exports.updateProfile = (req, res) => {
    let bio = req.sanitize(req.body.bio);
    let realname = req.body.realname;
    User.findByIdAndUpdate(req.user.id, { bio, realname }, (err, updatedUser) => {
        if (err) {
            req.flash("error", "You can't do that");
            res.redirect("back");
        } else {
            req.flash("success", "Profile Updated")
            res.redirect("/pops");
        }
    });
}