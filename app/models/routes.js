module.exports = function(app, passport) {


    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });


    app.get('/login', function(req, res) {

        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });


app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/home', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });
    
    
   app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/home', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/home', isLoggedIn, function(req, res) {
        var mongoose = require('mongoose');
        var db = require('../../config/database.js');
 
        
        var Schema = mongoose.Schema;
         var poll = new Schema({
                title: String,
         });

        var PollModel = mongoose.model('polls', poll);
        var poll = mongoose.model("polls");


        poll.find({}, function(err, data){
        if (err) console.log(err);
        console.log(">>>> " + data);
        res.render('home.ejs', {
            user: req.user,
            data: data
        });
    });

    });
    
    app.get('/create', isLoggedIn, function(req, res) {
        res.render('create.ejs', {
            user: req.user
        });
    });
    
    
    app.get('/account', isLoggedIn, function(req, res) {
        res.render('account.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });


    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
