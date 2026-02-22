const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    userId:{ type: String, required: false},
    subject: {type: String, required: true},
    joinCode: {type: String, required: true},
    joinedUsers: {type: [String], required: false, default:[]}
})

const classModel = mongoose.model("class", classSchema);

module.exports = classModel;