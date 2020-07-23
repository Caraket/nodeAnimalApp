const express          = require("express"),
      expressSanitizer = require("express-sanitizer"),      
      bodyParser       = require("body-parser"),
      methodOverride   = require("method-override"),
      mongoose         = require("mongoose"),
      app              = express();

const routes    = require("./Routes/routes"),
      dogRoutes = require("./Routes/dogRoutes"),
      catRoutes = require("./Routes/catRoutes");

// APP CONFIG
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost:27017/animalapp", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

app.use(catRoutes);
app.use(dogRoutes);
app.use(routes);

app.listen(3000, () => {
    console.log("App is listening on port 3000");
});