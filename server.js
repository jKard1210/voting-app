var express = require('express')
  , passport = require('passport')
  , flash = require('connect-flash')
  , utils = require('./utils')
  , LocalStrategy = require('passport-local').Strategy;



var users = [];


function findById(id, fn) {
  var idx = id - 1;
  if (users[idx]) {
    fn(null, users[idx]);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
}

function findByUsername(username, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.username === username) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}

/* Fake, in-memory database of remember me tokens */

var tokens = {}



passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    process.nextTick(function () {
     
      findByUsername(username, function(err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
        if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
        return done(null, user);
      })
    });
  }
));





var users = [
    { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' }
  , { id: 2, username: 'joe', password: 'birthday', email: 'joe@example.com' }
];

var app = express()
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');;
var methodOverride = require('method-override')


  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.engine('ejs', require('ejs-locals'));
  app.use(cookieParser());
app.use(cookieSession({secret: 'app_1'}));
  app.use(express.logger());
  app.use(express.static(__dirname + '/../../public'));
  app.use(methodOverride());
  app.use(flash());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(passport.authenticate('remember-me'));
  app.use(app.router);



app.get("/", function(req,res){
     res.render('index', { user: req.user });
})

app.get('/account', ensureAuthenticated, function(req, res){
  res.render('account', { user: req.user });
});

app.get('/signup', function(req, res) {
    res.render('signup');
})

app.get('/login', function(req, res){
  res.render('login', { user: req.user, message: req.flash('error') });
});



app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  function(req, res, next) {
    // Issue a remember me cookie if the option was checked
    if (!req.body.remember_me) { return next(); }
    
  },
  function(req, res) {
    res.redirect('/');
  });
  
  app.post('/account', 
  function(req, res) {
      res.redirect('/account');
  })

app.get('/logout', function(req, res){
  // clear the remember me cookie when logging out
  res.clearCookie('remember_me');
  req.logout();
  res.redirect('/');
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})

