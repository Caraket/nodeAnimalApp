const express          = require("express"),
      path             = require("path"),
      session          = require('express-session'),
      cors             = require('cors'),
      expressSanitizer = require("express-sanitizer"),      
      bodyParser       = require("body-parser"),
      methodOverride   = require("method-override"),
      mongoose         = require("mongoose"),
      app              = express();

mongoose.promise = global.Promise;


require('./Models/Users');
require('./config/passport');

// APP CONFIG
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost:27017/animalapp", {useNewUrlParser: true});

app.use(cors());
app.use(require('morgan')('dev'));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false}));



app.use(require('./Routes'));

app.listen(3000, () => {
    console.log("App is listening on port 3000");
});