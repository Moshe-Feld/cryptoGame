const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  coins: { type: Number, default: 50 },
  level: { type: Number, default: 1 },
  filmLevel: { type: Number, default: 1 },
  peopleLevel: { type: Number, default: 1 },
  tvLevel: { type: Number, default: 1 },
  levelCompleted: { type: [String], default: [] }
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
