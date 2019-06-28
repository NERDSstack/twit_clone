const Pops = require("../models/Pops");
const Comment = require("../models/Comment");
exports.getComments = (req, res) => {
    Pops.findById(req.params.id, (err, pop) => {
        if (err) {
            console.log("Error: " + err);
        } else {
            res.render("comments/new", { pop: pop, title: "Add Comment", currentUser: req.user });
        }
    })
};
exports.postComment = (req, res) => {
    Pops.findById(req.params.id, (err, pop) => {
        if (err) {
            console.log("Error: " + err);
            req.flash("error", "You can't do that");
            res.redirect("/pops");
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log("Error: " + err);
                } else {
                    // add username
                    //gets name from Comment object
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    // pushes comment thru id
                    pop.comments.push(comment);
                    pop.save();
                    req.flash("success", "Comment added");
                    res.redirect("/pops/" + pop._id);
                }
            });
        }
    });
}
exports.editComment = (req, res) => {
    Pops.findById(req.params.id, (err, foundPop) => {
        if (err || !foundPop) {
            req.flash("error", "Pop not found");
            res.redirect("back");
        } else {
            Comment.findById(req.params.comment_id, (err, foundComment) => {
                if (err || !foundComment) {
                    res.redirect("back");
                } else {
                    // pop i.d. is defined in app.js
                    // this tells edit page that it can shorten the i.d.
                    res.render("comments/edit", { pop: foundPop, pop_id: req.params.id, comment: foundComment, title: "Edit Comment" });
                }
            });
        }
    });
}
exports.updateComment = (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/pops/" + req.params.id);
        }
    });
}
exports.deleteComment = (req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if (err) {
            console.log("Error: " + err);
            res.redirect("back");
        } else {
            req.flash("success", "Comment deleted");
            res.redirect("/pops/" + req.params.id);
        }
    });
}