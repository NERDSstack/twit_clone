// uses express routes to render pages
const express = require("express");
const router = express.Router();
const Pops = require("../models/Pops");
// if there's a file name index in a folder you don't
// have to explicitly require it express does it automatically
const middleware = require("../middleware");
// shows all pops
router.get("/pops", middleware.isLoggedIn, (req, res)=>{
    // gets all pops from db
    Pops.find({}, (err, allPops)=>{
        if(err){
            console.log("Error: " + err);
        }else{
            res.render("pops/index", {pops: allPops, title: "All Pops", currentUser: req.user});
        }
    });
});
// goes to form to make new pop
router.post("/pops", middleware.isLoggedIn, (req, res)=>{
    //grabs data and adds it to pops array
    let name = req.body.name;
    let poptext = req.sanitize(req.body.poptext);
    let author = {
        id: req.user._id,
        username: req.user.username
    }
    let newPop = {name: name, poptext: poptext, author: author}
    // create new pop and save
    Pops.create(newPop, (err, newlyCreated)=>{
        if(err){
            console.log("Error: " + err);
        }else{
            res.redirect("/pops");
        }
    });
});
// gets newly made pop
router.get("/pops/new", (req, res)=>{
    res.render("pops/newPop", {title: "Your Pop"})
});
// show route
// shows info from one pop
router.get("/pops/:id", (req, res)=>{
    Pops.findById(req.params.id).populate("comments").exec((err, foundPop)=>{
        if(err || !foundPop){
            req.flash("error", "Pop not found");
            console.log("Error: " + err);
        }else{
            res.render("pops/show", {title: "Your Pop", pop: foundPop, currentUser: req.user});
        }
    });
});
// edit pop route
router.get("/pops/:id/edit", middleware.checkPopsOwnership, (req, res)=>{
    Pops.findById(req.params.id, (err, foundPop)=>{
            res.render("pops/edit", {pop: foundPop, title: "Edit"});
    });
});
// update pop
router.put("/pops/:id", middleware.checkPopsOwnership, (req, res)=>{
    Pops.findByIdAndUpdate(req.params.id, req.body.pop, (err, updatedPop)=>{
        if(err){
            console.log("Error: " + err);
            res.redirect("/pops/edit");
        }else{
            req.flash("succes", "Pop Updated"+ {pop: updatedPop});
            res.redirect("/pops/" + req.params.id);
        }
    });
});
// delete pop
router.delete("/pops/:id", middleware.checkPopsOwnership, (req, res)=>{
    Pops.findOneAndDelete({_id: req.params.id}, (err)=>{
        if(err){
            console.log("Error: " + err);
            res.redirect("/pops");
        }else{
            console.log(req.params.id);
            res.redirect("/pops");
        }
    });
});
module.exports = router;