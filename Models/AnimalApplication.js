var mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
    name: String,
    otherName: String,
    dob: String,
    phoneNumber: String,
    emailAddress: String,
    homeAddress: String,
    petAdopt: String,
    typeOfPet: String,
    adult1: String,
    adult2: String,
    adult3: String,
    adult4: String,
    adult5: String,
    dob1: String,
    dob2: String,
    dob3: String,
    dob4: String,
    dob5: String,
    children: String,
    hmchildren: String,
    hmchildren2: String,
    currAddress: Number,
    steadyEmployment: String,
    whyAdopt: String,
    personality: String,
    unacceptable: String,
    ownorRent: String,
    cityOrd: String,
    checkWithLord: String,
    landLord: String,
    landLordPhone: String,
    otherPets: String,
    getAlong: String,
    pastAnimals: String,
    currentVet: String,
    sleep: String,
    reference1: String,
    reference2: String,
    allergies: String,
    surrendered: String,
    indoorOutdoor: String,
    homeAlone: String

})