const mongoose = require('mongoose')

const quoteScheme = new mongoose.Schema({
    text :{type: String, required: true},
    author:{type: String, required: true},
    classId: {type: mongoose.Schema.Types.ObjectId, required: true} //refernce to class._id
})

const quoteModel = mongoose.model("quote", quoteScheme);

module.exports = quoteModel;
