const mongoose = require('mongoose')

const qouteScheme = new mongoose.Schema({
    qoute :{type: String, required: true},
    author:{type: String, required: true},
    category:{type: String, required: true},
    teacherId: {type: String, required: true},
})

const qouteModel = mongoose.model("qoute", qouteScheme);

module.exports = qouteModel;