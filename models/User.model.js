const mongoose = require('mongoose')

const User = new mongoose.Schema({
  usename: String,
  firstName: String,
  lastName: String,
  password: String,
});

module.exports = mongoose.model('User', User)
