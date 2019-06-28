// uses express routes to render pages
const express = require("express");
const router = express.Router();
const popsController = require("../controllers/popsController");
// if there's a file name index in a folder you don't
// have to explicitly require it express does it automatically
const middleware = require("../middleware");
// shows all pops
router.get("/pops", middleware.isLoggedIn, popsController.getPops);
// goes to form to make new pop
router.post("/pops", middleware.isLoggedIn, popsController.postPops);
// gets newly made pop
router.get("/pops/new", popsController.getNewPop);
// show route
// shows info from one pop
router.get("/pops/:id", popsController.popById);
// edit pop route
router.get("/pops/:id/edit", middleware.checkPopsOwnership, popsController.editPop);
// update pop
router.put("/pops/:id", middleware.checkPopsOwnership, popsController.updatePop);
// delete pop
router.delete("/pops/:id", middleware.checkPopsOwnership, popsController.deletePop);
module.exports = router;