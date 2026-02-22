const mongoose = require('mongoose')

const quoteScheme = new mongoose.Schema({
    quote :{type: String, required: true},
    author:{type: String, required: true},
    classId: {type: mongoose.Schema.Types.ObjectId, required: true}
})

const quoteModel = mongoose.model("quote", quoteScheme);

module.exports = quoteModel;