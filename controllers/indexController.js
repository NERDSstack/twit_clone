const User = require("../models/User");

exports.loginOrSignup = (req, res) => {
    res.render("index/loginOrSignup", { title: "Log in or Sign up" });
}
exports.registerPage = (req, res) => {
    res.render("index/signup", { title: "Sign Up", currentUser: req.user });
}
exports.register = (req, res) => {
    const newUser = new User(
        {
            username: req.body.username,
            realname: req.body.realname,
            avatar: req.body.avatar,
            email: req.body.email,
            bio: req.body.bio
        }
    );
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            req.flash("error", err.message);
            res.render("index/signup", { title: "Sign Up" });
        }
        passport.authenticate("local")(req, res, () => {
            req.flash("success", "Welxome to TwitClone " + req.body.username);
            res.redirect("/pops");
        });
    });
}
exports.loginPage = (req, res) => {
    res.render("index/login", { title: "Login", currentUser: req.user });
}

exports.logout = (req, res) => {
    req.logout();
    res.redirect("/pops");
}