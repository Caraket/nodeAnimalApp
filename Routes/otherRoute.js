const express = require("express");
const router  = express.Router();
const Dogs    = require("../Models/Animal"); 

// Dog Route
router.get("/other", (req, res) => {
    Dogs.find({}, (err, animal) => {
        if(err){
            console.log(err);
        } else{
            res.render("./Other/other", {animal: animal});
        }
    });
});


module.exports = router;