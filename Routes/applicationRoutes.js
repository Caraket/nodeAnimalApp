const { application } = require("express");
const express = require("express");
const adopt = require('../Models/AnimalApplication');
const router = express.Router();



router.get("/", (req, res) => {
    adopt.find({}, (err, application) => {
        if (err) {
            console.log(err);
        } else {
            const { userContext } = req;
            res.render("adoptapplication/index", {
                application: application,
                userContext
            });

        }
    });
});

//CREATE ROUTE
router.post("/", (req, res) => {

    var myData = new adopt(req.body);
    myData.save()
        .then(item => {
            res.status(200).redirect("adoptapplication/index");
        })
        .catch(err => {
            res.status(400).send("Unable to save to the Database");
        })

});

//SHOW ROUTE
router.get("/:id", (req, res) => {
    adopt.findById(req.params.id, (err, foundApplication) => {
        if (err) {
            res.redirect("/applications");
        } else {
            const { userContext } = req;
            res.render("AdoptApplication/show", {
                application: foundApplication,
                userContext
            });
        }
    });
});


// EDIT ROUTE
router.get("/:id/edit", (req, res) => {
    adopt.findById(req.params.id, (err, foundApplication) => {
        if (err) {
            res.redirect("/applications/show");
        } else {
            const { userContext } = req;
            res.render("adoptapplication/edit", {
                application: foundApplication,
                userContext
            });
        }
    });
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


// DESTROY  Route
router.delete("/:id/", function (req, res) {
    adopt.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/applications/");
        } else {
            res.redirect("/applications/");
        }
    });
});



module.exports = router;