const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: false },//refernce to user.userName
    subject: { type: String, required: true },
    joinCode: { type: String, required: true, unique: true },
})

const classModel = mongoose.model("class", classSchema);

module.exports = classModel;