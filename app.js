const express          = require("express");
const path = require("path");
const mongo = require('mongodb');
const expressSanitizer = require("express-sanitizer");
const bodyParser       = require("body-parser");
const methodOverride   = require("method-override");
const mongoose         = require("mongoose")
const app              = express();

const index = require('./Routes/index');
const dogs = require('./Routes/dogRoutes');
const cats = require('./Routes/catRoutes');

// APP CONFIG
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost:27017/animalapp", {useNewUrlParser: true});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressSanitizer());
app.use(methodOverride("_method"));



app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
})

app.use(index);
app.use(dogs);
app.use(cats);

app.listen(3000, () => {
    console.log("App is listening on port 3000");
});