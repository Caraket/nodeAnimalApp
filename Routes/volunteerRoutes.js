const express = require("express");
const router  = express.Router();
const Volunteer    = require("../Models/Volunteer"); 

// Dog Route
router.get("/", (req, res) => {
    Volunteer.find({}, (err, volunteer) => {
        if(err){
            console.log(err);
        } else{
            const { userContext } = req;
            res.render("./Volunteer/volunteer", {
                volunteer: volunteer,
                userContext
            });
        }
    });
});


//NEW ROUTE
router.get("/new", (req, res) => {
    res.render("./Volunteer/new");
});

//CREATE ROUTE
router.post("/", (req, res) => {
    Volunteer.create(req.body.volunteer, (err, newVolunteer) => {
        if(err){
            res.render("/volunteer/new");
        } else{
            res.redirect("/volunteer");
        }
    });
});

//SHOW ROUTE
router.get("/:id", (req, res) => {
    Volunteer.findById(req.params.id, (err, foundVolunteer) => {
        if(err){
            console.log(err);
            res.redirect("/volunteer");
        } else{
            res.render("volunteer/show", {volunteer: foundVolunteer});
        }
    });
});



module.exports = router;