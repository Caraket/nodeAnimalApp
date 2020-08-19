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
            res.render("Volunteer/show", {
                volunteer: foundVolunteer,
                userContext
            });
        }
    });
});

// EDIT ROUTE
router.get("/:id/edit", (req, res) => {
    Volunteer.findById(req.params.id, (err, foundVolunteer) => {
        if(err){
            res.redirect("/");
        } else{
            const { userContext } = req;
            res.render("Volunteer/edit", {
                volunteer: foundVolunteer,
                userContext
            });
        }
    });
});

//UPDATE ROUTE
router.put("/:id", (req, res) => {
    Volunteer.findByIdAndUpdate(req.params.id, req.body.volunteer, (err, foundVolunteer) => {
        if(err){
            res.redirect("/");
        } else{
            res.redirect("/" + req.params.id);
        }
    });
});

module.exports = router;