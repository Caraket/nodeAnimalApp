const express          = require("express"),
      expressSanitizer = require("express-sanitizer"),      
      bodyParser       = require("body-parser"),
      methodOverride   = require("method-override"),
      mongoose         = require("mongoose"),
      session          = require("express-session"),
      okta             = require("@okta/okta-sdk-nodejs"),
      expressOIDC      = require("@okta/oidc-middleware").ExpressOIDC,
      app              = express();

var oktaClient = new okta.Client({
    orgUrl: 'https://dev-144067.okta.com',
    token: '00UGeAJU3l2azKUuB5CXDju-9uvsVBIvf78-uV6Ya1'
});

const oidc = new expressOIDC({
    issuer: "https://dev-144067.okta.com/oauth2/default",
    client_id: '0oalyslqxdiIqcBBK4x6',
    client_secret: '3bhN9OZwpNCGY6FjJKz_075ohSaNWzkZyqspC2bS',
    appBaseUrl: 'http://localhost:3000',
    redirect_uri: 'http://localhost:3000/users/callback',
    scope: "openid profile",
    routes: {
        login: {
            path: "users/login"
        },
        callback: {
            path: "/users/callback",
            defaultRedirect: "/"
        }
    }
});


// APP CONFIG
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost:27017/animalapp", {useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(session({
    secret: 'sadkfj23i90ufsdfjh23409u82thisdjfk3209',
    resave: true,
    saveUninitialized: false
}));
app.use(oidc.router);

app.use((req, res, next) => {
    if(!req.userinfo){
        return next();
    }

    oktaClient.getUser(req.userinfo.sub)
        .then(user => {
            req.user = user;
            res.locals.user = user;
            next();
        }).catch(err => {
            next(err);
        });
});

function loginRequired(req, res, next){
    if(!req.user){
        return res.status(401).render("unauthenticated");
    }
    next();
}

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

// TEST ROUTE
app.get('/test', (req, res) => {
    res.json({ profile: req.user ? req.user.profile : null});
});


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

app.get("/login", (req, res) => {
    res.render("login");
});

//SHOW ROUTE
app.get("/:id", loginRequired, (req, res) => {
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