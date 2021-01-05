const { application } = require("express");
const express = require("express");
const adopt = require('../Models/AnimalApplication');
const router = express.Router();



router.get("/show", (req, res) => {
    adopt.find({}, (err, application) => {
        if (err) {
            console.log(err);
        } else {
            const { userContext } = req;
            res.render("adoptapplication/show", {
                application: application,
                userContext
            });

        }
    });
});

//NEW ROUTE
router.get("/", (req, res) => {
    const { userContext } = req;
    res.render("adoptapplication/application");
});

//CREATE ROUTE
router.post("/", (req, res) => {

    var myData = new adopt(req.body);
    myData.save()
        .then(item => {
            res.send("Information saved to Database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to the Database");
        })

});


module.exports = router;