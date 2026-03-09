const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    userId:{ type: String, required: false},//refernce to user.userName
    subject: {type: String, required: true},
    joinCode: {type: String, required: true, unique: true},
    joinedUsers: {type: [String], required: false, default:[]}
})

const classModel = mongoose.model("class", classSchema);

module.exports = classModel;