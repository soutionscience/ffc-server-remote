const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let newUser = new Schema({
    username: String,
    email: String
});

module.exports = mongoose.model('newUser', newUser)