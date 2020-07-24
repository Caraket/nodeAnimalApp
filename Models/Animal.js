var mongoose = require("mongoose");

const animalSchema = new mongoose.Schema({
    petId: String,
    species: String,
    name: String,
    sex: String,
    breed: String,
    age: {type: Number},
    altered: String,
    alteredDate: {type: Date},
    intake: {type: Date, default: Date.now},
    created: {type: Date, default: Date.now},
    body: String,
});

module.exports = mongoose.model("Animal", animalSchema);