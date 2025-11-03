const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    teacherId:{ type: String, required: false},
    classId: {type: String, required: true},
    subject: {type: String, required: true},
    students: {type: [String], required: false, default:[]}
})

const classModel = mongoose.model("class", classSchema);

module.exports = classModel;