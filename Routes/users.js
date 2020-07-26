const express = require('express');
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
        console.log('YES');
    } else{
        console.log('No');
    }
});

module.exports = router;