const { application } = require("express");
const express = require("express");
const adopt = require('../Models/AnimalApplication');

const router = express.Router();




router.get("/", (req, res) => {
    const { userContext } = req;
    res.render("adoptapplication/application");
});


//CREATE ROUTE
router.post("/", (req, res) => {

    var myData = new adopt(req.body);
    myData.save()
        .then(item => {
            res.status(200).redirect("http://www.greattailsanimalrescue.com");
        })
        .catch(err => {
            console.log(err);
            res.status(400).send("Unable to save to the Database");
        })

});



module.exports = router;