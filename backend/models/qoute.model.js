const mongoose = require('mongoose')

const qouteScheme = mongoose.Schema({
    "userId": String,
    "qoute": String,
    "author": String,
    "category": String
})

const qouteModel = mongoose.model("qoute", qouteScheme);

module.exports = qouteModel;