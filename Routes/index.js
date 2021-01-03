require('dotenv').config();
const express = require("express");
const router = express.Router();
const moment = require('moment');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const Animal = require("../Models/Animal");
const mongoose = require('mongoose');

router.get('/login', (req, res) => {

    res.render('login');
})




var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Routes/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({ storage: storage });








// RESTful ROUTES

//INDEX ROUTE
router.get("/", (req, res) => {
    Animal.find({}, (err, animals) => {
        if (err) {
            console.log(err);
        } else {
            const { userContext } = req;
            res.render("index", {
                animals: animals,
                userContext
            });

        }
    });
});


//NEW ROUTE
router.get("/new", (req, res) => {
    const { userContext } = req;
    res.render("new", {
        userContext
    });
});



//CREATE ROUTE
router.post("/", upload.single('image'), (req, res) => {
    Animal.create(req.body.animal, (err, newAnimal) => {
        if (err) {

            res.render("new");
        } else {
            var obj = {
                img: {
                    data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                    contentType: 'image/jpg'
                }
            }

            Animal.update(obj, (err, item) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.redirect("/");

                }
            })


        }
    });
});

//SHOW ROUTE
router.get("/:id", (req, res) => {
    Animal.findById(req.params.id, (err, foundAnimal) => {
        if (err) {
            console.log(err);
            res.redirect("/");
        } else {
            const { userContext } = req;
            res.render("show", {
                animal:
                    foundAnimal,
                userContext
            });
        }
    });
});

// EDIT ROUTE
router.get("/:id/edit", (req, res) => {
    Animal.findById(req.params.id, (err, foundAnimal) => {
        if (err) {
            res.redirect("/");
        } else {
            const { userContext } = req;
            res.render("edit", {
                animal: foundAnimal,
                moment: moment,
                userContext
            });
        }
    });
});

//UPDATE ROUTE
router.put("/:id", (req, res) => {
    Animal.findByIdAndUpdate(req.params.id, req.body.animal, (err, updatedAnimal) => {
        if (err) {
            res.redirect("/");
        } else {
            res.redirect("/" + req.params.id);
        }
    });
});

// DESTROY  Route
router.delete("/:id/", function (req, res) {
    Animal.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            res.redirect("/");
        } else {
            res.redirect("/");
        }
    });
});

module.exports = router;