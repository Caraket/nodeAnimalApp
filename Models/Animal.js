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

    //Cats
    fvrcp1: Boolean,
    fvrcp2: Boolean,
    felineLeukemia: Boolean,

    //Both
    rabies: Boolean,

    //Dogs
    dappv: Boolean,
    dappv2: Boolean,
    wormerType: String,
    dewormer1: Boolean,
    dewormer2: Boolean,
    dewormer3: Boolean,
    lymes: Boolean

});

module.exports = mongoose.model("Animal", animalSchema);