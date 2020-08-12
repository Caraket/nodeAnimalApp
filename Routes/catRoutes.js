const express = require("express");
const router  = express.Router();
const Cats    = require("../Models/Animal"); 

// Cat Route
router.get("/cats", (req, res) => {
    Cats.find({}, (err, cats) => {
        if(err){
            console.log(err);
        } else{
            const { userContext } = req;
            res.render("./Cats/cats", {
                cats: cats,
                userContext
            });
        }
    });
});





module.exports = router;