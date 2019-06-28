const userProfileController = require("../controllers/userprofileController");
// uses express to route thru app
const express = require("express");
const router = express.Router();
// if there's a file name index in a folder you don't
// have to explicitly require it express does it automatically


router.get("/profile/:id", userProfileController.getProfile);
router.get("/profile/:id/edit", userProfileController.editProfile);
router.put("/profile/:id", userProfileController.updateProfile);

module.exports = router;