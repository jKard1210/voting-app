var express = require('express');
var app = express()
var multer  = require('multer');
var storage = multer.memoryStorage()
var bodyParser = require('body-parser');
var upload = multer({ storage: storage })
var passwordHash = require('password-hash');
var fs = require('fs');
var session = require('client-sessions');


var users = [];

app.use(bodyParser());

app.use(session({
  cookieName: 'username',
  secret: 'a359d9fj',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}));


app.get("/", function(req,res){
     if (req.session && req.session.user) {
         res.send("Hello Again");
     }
     else {
    res.sendfile(__dirname + "/main.html");
     }
})

app.post("/login", function(req,res){
    res.sendFile(__dirname + "/login.html")
})

app.post("/signup", function(req,res){
    res.sendFile(__dirname + "/signup.html")
})

app.post("/newAccount", function(req,res){
    var hashedPass = passwordHash.generate(req.body.pass);

    var addition = {
        pass: hashedPass,
        email: req.body.email,
        user: req.body.user
    };
    users.push(addition);
    req.session.user = req.body.user;
    
    if (req.session && req.session.user) {
         res.send(req.session.user);
     }
    
    res.sendFile(__dirname + "/homepage.html")
})

app.post("/check", function(req,res){
    var x = -1;
    var pass = req.body.pass;
    var user = req.body.user;
    
    for (var i = 0 ; i < users.length; i++) {
        if (user == users[i].user) {
            x = i;
        }
    }
    
    if (x == -1) {
        res.send("Error: Incorrect Username");
    }
    else {
        if (passwordHash.verify(pass, users[x].pass)) {
            req.session.user = user;
            res.sendFile(__dirname + "/homepage.html")

        }
        else {
            res.send("Error: Incorrect Password");
        }
    }
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})

