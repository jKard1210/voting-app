var express = require('express');
var app = express()
var multer  = require('multer');
var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

app.get("/", function(req,res){
    res.sendfile(__dirname + "/main.html");
})

app.post("/login", function(req,res){
    res.json({"size": 1})
})

app.post("/signup", function(req,res){
    res.json({"size": 1})
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})

