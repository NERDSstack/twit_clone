const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    username: 
            {
                type: String,
                unique: true,
            },
    password: 
            {
                type: String,
            },
    realname: String,        
    avatar: String,
    email: {
                type: String,
                unique: true,
            },
    bio: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);