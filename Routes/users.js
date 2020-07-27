const express = require('express');
const user = require('../Models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();


//Register
router.get('/register', (req, res) => {
    res.render('register');
});

//Login
router.get('/login', (req, res) => {
    res.render('login');
});

//Register User
router.post('/register', (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);




    var errors = req.validationErrors();

    if(errors){
        res.render("register", {errors: errors});
    } else{
        var newUser = new user({
            name: name,
            email: email,
            username: username,
            password: password
        });
        user.createUser(newUser, (err, user) => {
            if(err) throw err;
            console.log(user);
        });

        res.redirect('login')
    }
});

passport.use(new LocalStrategy(
    function(username, password, done) {
      user.getUserByUsername(username, (err, user) => {
          if(err){
              throw err;
          }
          if(!user){
              return done(null, false, {message: 'Unknown user'});
          }

          user.comparePassword(password, user.password, (err, isMatch) => {
            if(err) {throw err;}
            if(isMatch){
                return done(null, user);
            } else{
                return done(null, false, {message: 'Invalid Password'});
            }
          })
      });
    }));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.getUserById(id, function(err, user) {
          done(err, user);
        });
      });
// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login'
    })(req, res, next);
  });

router.get('/logout', (req, res) => {
    req.logout();

    res.redirect('login');
});

module.exports = router;