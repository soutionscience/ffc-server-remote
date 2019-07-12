const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let player = new Schema({
    web_name: String,
    first_name: String,
    second_name: String,
    squad_number: Number,
    now_costs: Number,
    teamName: String,
    poinsTotal: Number,
    pointsWeek: Number,
    address: String

})

let team = new Schema({
    name: String,
    position: Number,
    short_name: String,
    code: Number,
    players:[player]

})

module.exports = mongoose.model('teams', team)