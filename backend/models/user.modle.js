const mongoose = require('mongoose')

const userScheme = mongoose.schema = ({
    "userName": String,
    "password": String,
    "email": String,
    "profile": String,
    "coins": Number,
    "level":Number
})

const userModel = mongoose.model("user", userScheme);

module.exports = userModel;
