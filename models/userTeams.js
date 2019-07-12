const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let userTeam = new Schema({
    username: String,
    balance: String,
    address: String,
    OauthId: String,
    OauthToken: String,
    email: String,
    admin:   {
        type: Boolean,
        default: false
    },
    players:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'player'
    }]
})


module.exports = mongoose.model('userTeam', userTeam)