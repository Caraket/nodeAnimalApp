require('dotenv').config();
const express = require("express");
const router  = express.Router();
const moment = require('moment');
const Animal  = require("../Models/Animal");


router.get('/login', (req, res) =>{
    
    res.render('login');
})


// RESTful ROUTES

//INDEX ROUTE
router.get("/", (req, res) =>{
    Animal.find({}, (err, animals) => {
        if(err){
            console.log(err);
        } else{
            const { userContext } = req;
            res.render("index", {
                animals: animals,
                userContext
            });
            
        }
    });
});


//NEW ROUTE
router.get("/new", (req, res) => {
    const { userContext } = req;
    res.render("new", {
        userContext
    });
});



//CREATE ROUTE
router.post("/", (req, res) => {
    Animal.create(req.body.animal, (err, newAnimal) => {
        if(err){
            console.log(err);
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
            const { userContext } = req;
            res.render("show", {
                animal: foundAnimal,
                userContext
            });
        }
    });
});

// EDIT ROUTE
router.get("/:id/edit", (req, res) => {
    Animal.findById(req.params.id, (err, foundAnimal) => {
        if(err){
            res.redirect("/");
        } else{
            const { userContext } = req;
            res.render("edit", {
                animal: foundAnimal,
                moment: moment,
                userContext
            });
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
router.delete("/:id/delete", (req, res) => {
    Animal.findByIdAndDelete(req.params.id, (err, deletedAnimal) => {
        if(err){
            console.log(err);
            res.redirect("/");
        } else{
            res.redirect("/");
        }
    })
});

module.exports = router;