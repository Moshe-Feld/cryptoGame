const mongoose = require('mongoose')

const qouteScheme = new mongoose.Schema({
    qoute :{type: String, required: true},
    author:{type: String, required: true},
    classId: {type: String, required: true}
})

const qouteModel = mongoose.model("qoute", qouteScheme);

module.exports = qouteModel;