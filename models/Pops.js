const mongoose = require("mongoose");
// Pop Schema
let popsSchema = new mongoose.Schema({
    name: String,
    poptext: String,
    author:{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

module.exports = mongoose.model("Pops", popsSchema);