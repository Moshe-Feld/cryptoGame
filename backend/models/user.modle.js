const mongoose = require('mongoose')

const userScheme = mongoose.schema = ({
    "email": String,
    "coins": Number,
    "leval":Number
})

const userModel = mongoose.model("user", userScheme);

module.exports = userModel;
