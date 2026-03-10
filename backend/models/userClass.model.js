const mongoose = require('mongoose')

const userClassScheme = new mongoose.Schema({
    userId: {type: String, required: true},
    classId: {type: mongoose.Schema.Types.ObjectId, required: true}
})

const userClassModel = new mongoose.model("userClasse", userClassScheme)

module.exports = userClassModel