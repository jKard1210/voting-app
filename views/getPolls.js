var mongoose = require('mongoose');


var db = require('../config/database.js');
mongoose.connect(db.url); 

 var Schema = mongoose.Schema;

    // login schema
    var poll = new Schema({
        title: String,
    });

    var PollModel = mongoose.model('polls', poll);
    var poll = mongoose.model("polls");

    poll.find({}, function(err, data){
        if (err) console.log(err);
        console.log(">>>> " + data );
    });
    
$(document).ready(function() {
    document.getElementById("polls").html("ababab");
});
