const express          = require("express"),
      expressSanitizer = require("express-sanitizer"),      
      bodyParser       = require("body-parser"),
      methodOverride   = require("method-override"),
      mongoose         = require("mongoose"),
      session          = require("express-session"),
      app              = express();

const routes = require("./routes");




// APP CONFIG
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost:27017/animalapp", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

//MONGOOSE/MODEL CONFIG
const animalSchema = new mongoose.Schema({
    petId: String,
    name: String,
    sex: String,
    breed: String,
    age: {type: Number},
    altered: String,
    alteredDate: {type: Date},
    intake: {type: Date, default: Date.now},
    created: {type: Date, default: Date.now},
    body: String,
});
const Animal = mongoose.model("Animal", animalSchema);

app.listen(3000, () => {
    console.log("App is listening on port 3000");
});