const Pops = require("../models/Pops");
const Comment = require("../models/Comment");
// all middleware goes here
const middlewareObj= {
    checkPopsOwnership: function(req, res, next){
        if(req.isAuthenticated()){
            Pops.findById(req.params.id,(err, foundPop)=>{
                if(err){
                    res.redirect("back");
                }else{
                    // does user own campground
                    // .equals method is from mongoose
                    // author.id and req.user.id are not the same type
                    // req.user.id is a string
                    // foundCampground.author.id is an object printed toString
                    // .equals compares their string values
                    if(foundPop.author.id.equals(req.user._id)){
                        next();
                    }else{
                        res.redirect("back");
                    }
                }
            });
        }else{
            res.redirect("back");
        }

    },
    checkCommentOwnership: function(req, res, next){
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id,(err, foundComment)=>{
                if(err){
                    res.redirect("back");
                }else{
                    // does user own comment
                    // .equals method is from mongoose
                    // author.id and req.user.id are not the same type
                    // req.user.id is a string
                    // foundCampground.author.id is an object printed toString
                    // .equals compares their string values
                    if(foundComment.author.id.equals(req.user._id)){
                        next();
                    }else{
                        res.redirect("back");
                    }
                }
            });
        }else{
            res.redirect("back");
        }
    },
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        res.redirect("/login");
    }
}

module.exports = middlewareObj;