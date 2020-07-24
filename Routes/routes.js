const express = require("express");
const router  = express.Router();
const Animal  = require("../Models/Animal");



// RESTful ROUTES

//INDEX ROUTE
router.get("/", (req, res) =>{
    Animal.find({}, (err, animals) => {
        if(err){
            console.log(err);
        } else{
            res.render("index", {animals: animals});
            
        }
    });
});



//NEW ROUTE
router.get("/new", (req, res) => {
    res.render("new");
});



//CREATE ROUTE
router.post("/", (req, res) => {
    Animal.create(req.body.animal, (err, newAnimal) => {
        if(err){
            res.render("new");
        } else{
            res.redirect("/");
        }
    });
});

//SHOW ROUTE
router.get("/:id", (req, res) => {
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
router.get("/:id/edit", (req, res) => {
    Animal.findById(req.params.id, (err, foundAnimal) => {
        if(err){
            res.redirect("/");
        } else{
            res.render("edit", {animal: foundAnimal});
        }
    });
});

//UPDATE ROUTE
router.put("/:id", (req, res) => {
    Animal.findByIdAndUpdate(req.params.id, req.body.animal, (err, updatedAnimal) => {
        if(err){
            res.redirect("/");
        } else{
            res.redirect("/" + req.params.id);
        }
    });
});

//Delete Route
router.delete("/:id/", (req, res) => {
    Animal.findByIdAndDelete(req.params.id, (err, deletedAnimal) => {
        if(err){
            res.redirect("/");
        } else{
            res.redirect("/");
        }
    })
});

module.exports = router;