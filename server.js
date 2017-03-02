var express = require('express');
var app = express()
var multer  = require('multer');
var storage = multer.memoryStorage()
var bodyParser = require('body-parser');
var upload = multer({ storage: storage })

app.use(bodyParser.urlencoded({ extended: true })); 

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
    res.json({"username": req.body.user, "password": req.body.pass, "email": req.body.email})
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})

