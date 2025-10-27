const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  profile: { type: String, required: true },
  coins: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  teacherId: {type: String}
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
