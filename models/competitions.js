const mongoose= require('mongoose');
const schema = mongoose.Schema;
// const userTeam = require('./userTeams')


let competition = new schema({
    etherId: String,
    name: String,
    maxPlayers: String,
    winner: {type: mongoose.Schema.Types.ObjectId,
        ref: 'user'},
    prizeMoney: Number,
    teams: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    playerCount: {type: Number, default: 0},
    complete: {type: Boolean, default: false}
})

module.exports = mongoose.model('competition', competition)