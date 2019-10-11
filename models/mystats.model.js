const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let myStat = new Schema({
    getStarted: {type: Number, default: 0}

})

module.exports = mongoose.model('myStat', myStat)