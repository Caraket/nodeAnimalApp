const express = require("express");
const router  = express.Router();
const Volunteer    = require("../Models/Volunteer"); 

// Dog Route
router.get("/", (req, res) => {
    Volunteer.find({}, (err, volunteer) => {
        if(err){
            console.log(err);
        } else{
            res.render("./Volunteer/volunteer", {volunteer: volunteer});
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



module.exports = router;