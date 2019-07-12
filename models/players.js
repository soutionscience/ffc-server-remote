const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let player = new Schema({
    web_name: String,
    player_code: String,
    first_name: String,
    second_name: String,
    squad_number: Number,
    previous_cost: Number,
    now_cost: Number,
    change: Number,
    base_cost: Number,
    teamName: String,
    pointsTotal: Number,
    pointsWeek: Number,
    address: String,
    team_code: Number,
    position: Number

})
player.methods.getChange = ()=>{
    return now_cost-previous_cost
}


module.exports = mongoose.model('player', player)