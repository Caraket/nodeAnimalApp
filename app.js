const express          = require("express"),
      expressSanitizer = require("express-sanitizer"),      
      bodyParser       = require("body-parser"),
      methodOverride   = require("method-override"),
      mongoose         = require("mongoose"),
      app              = express();


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

// RESTful ROUTES

//INDEX ROUTE
app.get("/", (req, res) =>{
    Animal.find({}, (err, animals) => {
        if(err){
            console.log(err);
        } else{
            res.render("index", {animals: animals});
            
        }
    });
});

//NEW ROUTE
app.get("/new", (req, res) => {
    res.render("new");
});

//CREATE ROUTE
app.post("/", (req, res) => {
    Animal.create(req.body.animal, (err, newAnimal) => {
        if(err){
            res.render("new");
        } else{
            res.redirect("/");
        }
    });
});

//SHOW ROUTE
app.get("/:id", (req, res) => {
    Animal.findById(req.params.id, (err, foundAnimal) => {
        if(err){
            console.log(err);
            res.redirect("/");
        } else{
            res.render("show", {animal: foundAnimal});
        }
    });
});

// EDIT ROUTE
app.get("/:id/edit", (req, res) => {
    Animal.findById(req.params.id, (err, foundAnimal) => {
        if(err){
            res.redirect("/");
        } else{
            res.render("edit", {animal: foundAnimal});
        }
    });
});

//UPDATE ROUTE
app.put("/:id", (req, res) => {
    Animal.findByIdAndUpdate(req.params.id, req.body.animal, (err, updatedAnimal) => {
        if(err){
            res.redirect("/");
        } else{
            res.redirect("/" + req.params.id);
        }
    })
})

//Delete Route
app.delete("/:id/", (req, res) => {
    Animal.findByIdAndDelete(req.params.id, (err, deletedAnimal) => {
        if(err){
            res.redirect("/");
        } else{
            res.redirect("/");
        }
    })
});

app.listen(3000, () => {
    console.log("App is listening on port 3000");
})