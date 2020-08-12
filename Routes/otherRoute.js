const express = require("express");
const router  = express.Router();
const Dogs    = require("../Models/Animal"); 

// Dog Route
router.get("/other", (req, res) => {
    Dogs.find({}, (err, animal) => {
        if(err){
            console.log(err);
        } else{
            const { userContext } = req;
            res.render("./Other/other", {
                animal: animal,
                userContext
            });
        }
    });
});


module.exports = router;