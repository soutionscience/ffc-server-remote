const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let value = new Schema({
    id: String,
    previousValue: String,
    nowValue: String,
    baseValue: String
    
})

module.exports = mongoose.model('value', value)