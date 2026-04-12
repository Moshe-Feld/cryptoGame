const mongoose = require('mongoose')
const DB_URL = 'mongodb+srv://moshefe_db_user:crypto123@cluster0.l6vcmbb.mongodb.net/'

const connect = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log("connected to DB")
    }
    catch (err) {
        console.error("fail to connect", err.message)
    }
}

module.exports = connect;