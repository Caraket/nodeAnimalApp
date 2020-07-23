const express = require("express");
const router  = express.Router();
const Cats    = require("../Models/Cats"); 

// Cat Route
router.get("/cats", (req, res) => {
    Cats.find({}, (err, cats) => {
        if(err){
            console.log(err);
        } else{
            res.render("./Cats/cats", {cats: cats});
        }
    });
});

//NEW Cat ROUTE
router.get("/catNew", (req, res) => {
    res.render("./Cats/catNew");
});


//Cat CREATE ROUTE
router.post("/cats", (req, res) => {
    Cats.create(req.body.cats, (err, newCat) =>{
        if(err){
            throw new Error("Cat not found;");
        } else{
            res.redirect("/cats");
        }
    });
});

//SHOW Cat ROUTE
router.get("/cats/:id", (req, res) => {
    Cats.findById(req.params.id, (err, foundCat) => {
        if(err){
            console.log(err);
            res.redirect("/cats");
        } else{
            res.render("./Cats/catShow", {cat: foundcat});
        }
    });
});

// cat EDIT ROUTE
router.get("/cats/:id/edit", (req, res) => {
    Animal.findById(req.params.id, (err, foundCat) => {
        if(err){
            res.redirect("/");
        } else{
            res.render("edit", {cat: foundCat});
        }
    });
});





module.exports = router;