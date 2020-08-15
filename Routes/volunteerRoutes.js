const express = require("express");
const router  = express.Router();
const Volunteer    = require("../Models/Volunteer"); 


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
    const { userContext } = req;
    res.render("./Volunteer/new", {userContext});
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
            res.redirect("/volunteer");
        } else{
            const { userContext } = req;
            res.render("./volunteer/show", {
                volunteer: foundVolunteer,
                userContext
            });
        }
    });
});



module.exports = router;