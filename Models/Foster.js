var mongoose = require("mongoose");

const fosterSchema = new mongoose.Schema({
    petId: String,
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

var fosterModel = mongoose.model("Foster", fosterSchema);
module.exports = fosterModel;