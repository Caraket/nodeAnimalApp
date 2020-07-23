const express = require("express");
const router  = express.Router();
const Dogs    = require("../Models/Dogs"); 

// Dog Route
router.get("/dogs", (req, res) => {
    Dogs.find({}, (err, dogs) => {
        if(err){
            console.log(err);
        } else{
            res.render("./Dogs/dogs", {dogs: dogs});
        }
    });
});

//NEW DOG ROUTE
router.get("/dogNew", (req, res) => {
    res.render("./Dogs/dogNew");
});


//DOG CREATE ROUTE
router.post("/dogs", (req, res) => {
    Dogs.create(req.body.dogs, (err, newDog) =>{
        if(err){
            throw new Error("Dog not found;");
        } else{
            res.redirect("/dogs");
        }
    });
});

//SHOW DOG ROUTE
router.get("/dogs/:id", (req, res) => {
    Dogs.findById(req.params.id, (err, foundDog) => {
        if(err){
            console.log(err);
            res.redirect("/dogs");
        } else{
            res.render("./Dogs/dogShow", {dog: foundDog});
        }
    });
});

// DOG EDIT ROUTE
router.get("/dogs/:id/edit", (req, res) => {
    Animal.findById(req.params.id, (err, foundDog) => {
        if(err){
            res.redirect("/");
        } else{
            res.render("edit", {dog: foundDog});
        }
    });
});





module.exports = router;