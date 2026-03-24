const mongoose = require('mongoose')

const userClassScheme = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, required: true},
    classId: {type: mongoose.Schema.Types.ObjectId, required: true}
})

userClassScheme.index({ userId: 1, classId: 1 }, { unique: true })

const userClassModel = mongoose.model("userClass", userClassScheme)

module.exports = userClassModel