var mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema({
    volunteerId: String,
    name: String,
    phoneNumber: String,
    email: String,
    address: String,
    start: {type: Date, default: Date.now},
    created: {type: Date, default: Date.now},
    body: String,
});

var volunteerModel = mongoose.model("Foster", volunteerSchema);
module.exports = volunteerModel;