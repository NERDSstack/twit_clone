const mongoose = require("mongoose");
const Pops = require("./models/Pops");
const Comment = require("./models/Comment");

var data = [
    {
        name: "Craig",
        poptext: "Craig nem"
    },
    {
        name: "Jimmy",
        poptext: "Jimmy nem"
    },
    {
        name: "Joe",
        poptext: "Joe nem"
    }
]

function seedDB(){
    // remove all Pops
    Pops.deleteMany({}, (err)=>{
        if(err){
            console.log("Error: " + err);
        }
        console.log("removed pops");
        // add pop
        data.forEach((seed)=>{
            // after removing pops
            // creates new pops using data array
            Pops.create(seed, (err, pop)=>{
                if(err){
                    console.log("Error: " + err);
                }else{
                    console.log("added a pop");
                    // create comment
                    // creates after making pop
                    Comment.create(
                        {
                            text: "This place has no wifi",
                            author: "Homer Simposon"
                        }, (err, comment)=>{
                            if(err){
                                console.log("Error: " + err);
                            }else{
                                // associates
                                // pushes comments to array for specific pop
                                pop.comments.push(comment);
                                pop.save();
                                console.log("create new comment");
                            }
                        });
                }
            });
        });
    });
}

module.exports = seedDB;