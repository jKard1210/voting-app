var express = require('express');
var app = express()
var multer  = require('multer');
var storage = multer.memoryStorage()
var bodyParser = require('body-parser');
var upload = multer({ storage: storage })
var passwordHash = require('password-hash');

var users = [];
var passes = [];
var emails = [];
var num = 0;


app.use(bodyParser());


app.get("/", function(req,res){
    res.sendfile(__dirname + "/main.html");
})

app.post("/login", function(req,res){
    res.sendFile(__dirname + "/login.html")
})

app.post("/signup", function(req,res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/newAccount", function(req,res){
    var hashedPass = passwordHash.generate(req.body.pass);
    users[num] = req.body.user;
    passes[num] = hashedPass;
    emails[num] = req.body.email;
    num++;
    
    res.sendFile(__dirname + "/homePage.html")
})

app.post("/check", function(req,res){
    var x = -1;
    var pass = req.body.pass;
    var user = req.body.user;
    for (var i = 0 ; i < num.length; i++) {
        if (user == users[i]) {
            x = i;
        }
    }
    
    if (x == -1) {
        res.send("Sorry");
    }
    else {
        if (passwordHash.verify(pass, passes[x])) {
            res.send("Nice");
        }
        else {
            res.send("Nope");
        }
    }
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})

