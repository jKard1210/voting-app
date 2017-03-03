var express = require('express');
var app = express()
var multer  = require('multer');
var storage = multer.memoryStorage()
var bodyParser = require('body-parser');
var upload = multer({ storage: storage })
var passwordHash = require('password-hash');
var fs = require('fs');
var Cookies = require( "cookies" )


var users = [];

app.use(bodyParser());


app.get("/", function(req,res){
    res.sendfile(__dirname + "/main.html");
})

app.post("/login", function(req,res){
    var user = cookies.get('username');
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
            fs.writeFile("username.txt", user, "utf8");
            res.sendFile(__dirname + "/username.txt");
        }
        else {
            res.send("Error: Incorrect Password");
        }
    }
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})

