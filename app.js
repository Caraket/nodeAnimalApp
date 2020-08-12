const express          = require("express");
const session = require('express-session');
const { ExpressOIDC } = require('@okta/oidc-middleware');
const path = require("path");
const mongo = require('mongodb');
const expressSanitizer = require("express-sanitizer");
const bodyParser       = require("body-parser");
const methodOverride   = require("method-override");
const mongoose         = require("mongoose");
const app              = express();

const index = require('./Routes/index');
const dogs = require('./Routes/dogRoutes');
const cats = require('./Routes/catRoutes');
const other = require('./Routes/otherRoute');
const volunteer = require('./Routes/volunteerRoutes');

// APP CONFIG
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost:27017/animalapp", {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);


const oidc = new ExpressOIDC({
    appBaseUrl: process.env.HOST_URL,
    issuer: `${process.env.OKTA_ORG_URL}/oauth2/default`,
    client_id: process.env.OKTA_CLIENT_ID,
    client_secret: process.env.OKTA_CLIENT_SECRET,
    redirect_uri: `${process.env.HOST_URL}/callback`,
    post_logout_redirect_uri: `localhost:3000`,
    scope: 'openid profile',
    routes: {
      loginCallback: {
        path: '/callback'
      },
    }
  });


// View Engine Setup
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressSanitizer());
app.use(methodOverride("_method"));



app.use(session({
       secret: `asKJijsk8823789sd-dsfhjds`,
       resave: true,
       saveUninitialized: false,
     }))
    


     app.use(oidc.router)
     app.use('/volunteer/',volunteer);
     app.use(other);
     app.use(dogs);
     app.use(cats);
     app.use('/', index)
     

app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
})




app.listen(3000, () => {
    console.log("App is listening on port 3000");
});