const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const competition = require('./competitions')

let league = new Schema({
    name: String,
    etherId: {type: String},
    desc: String,
    competitions: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'competition'
    }],
    active:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('league', league)