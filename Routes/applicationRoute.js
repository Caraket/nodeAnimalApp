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
            res.status(400).send("Unable to save to the Database");
        })

});

//UPDATE ROUTE
router.put("/:id", (req, res) => {
    adopt.findByIdAndUpdate(req.params.id, req.body.adopt, (err, updatedApplication) => {
        if (err) {
            res.redirect("/applications/");
        } else {
            res.redirect("/applications" + req.params.id);
        }
    });
});

module.exports = router;