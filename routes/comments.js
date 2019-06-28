// uses express to route thru app
const express = require("express");
const router = express.Router({ mergeParams: true });
const middleware = require("../middleware");
const commentsController = require("../controllers/commentsController");
// goes to comments form
router.get("/new", middleware.isLoggedIn, commentsController.getComments);
// where comments form posts to
// shows comments and single pop
router.post("/", middleware.isLoggedIn, commentsController.postComment);
// comments edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, commentsController.editComment);
// comments update
router.put("/:comment_id", middleware.checkCommentOwnership, commentsController.updateComment);
// delete comment
router.delete("/:comment_id", middleware.checkCommentOwnership, commentsController.deleteComment);
module.exports = router;