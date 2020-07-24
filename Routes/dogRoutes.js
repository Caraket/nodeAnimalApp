const express = require("express");
const router  = express.Router();
const Dogs    = require("../Models/Animal"); 

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


module.exports = router;