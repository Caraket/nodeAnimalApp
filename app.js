const express          = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const flash = require("connect-flash");
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
const expressSanitizer = require("express-sanitizer");
const bodyParser       = require("body-parser");
const methodOverride   = require("method-override");
const mongoose         = require("mongoose")
const app              = express();
let db = mongoose.connection;

mongoose.promise = global.Promise;


const index = require('./Routes/index');
const users = require('./Routes/users');
const dogs = require('./Routes/dogRoutes');
const cats = require('./Routes/catRoutes');

// APP CONFIG
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost:27017/animalapp", {useNewUrlParser: true});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//Express Session
app.use(session({
    secret: 'as323klseidsf098234r532th',
    saveUninitialized: true,
    resave: true
}));

// Passport Init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator

app.use(expressValidator({
    errorFormatter: function(param, msg, value){
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;

        while(namespace.length) {
            formParam += '[' + namespace.shift() + ']';
        }
        return {
            param : formParam,
            msg   : msg,
            value : value
        }
    }
}));

app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
})

app.use('/', index);
app.use('/dogs', dogs);
app.use('/cats', cats);
app.use('/users', users);

app.listen(3000, () => {
    console.log("App is listening on port 3000");
});