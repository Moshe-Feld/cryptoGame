const mongoose = require('mongoose')
const DB_URL = 'mongodb+srv://user:123@cluster0.r2nip.mongodb.net/'

const connect = async () => {
    try {
        await mongoose.connect(DB_URL);
        console.log("connected to DB")
    }
    catch (err) {
        console.error("fail to connect")
    }
}

module.exports = connect;