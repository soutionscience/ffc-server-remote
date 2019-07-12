const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const competition = require('./competitions')



let leagues = new Schema({
    name: String,
    etherId: {type: Number, unique: true},
    desc: String,
    maxPlayers: {
        type:Number,
        default: 0
    },
    playerCount:{
        type: Number,
         default: 0
    },
    
    winner:{type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    prizeMoney: Number,
    complete: {
        type: Boolean,
        default: false},
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' 
     }],
    active: {
        type: Boolean,
        default: false},
    

})

// leagues.methods.getPlayerCount =()=>{
//     return users.length

// }


// let leagues = new Schema({
//     league: [myLeague]
// })




module.exports = mongoose.model('leagues', leagues)