const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');




let user = new Schema({
    nonce: {
        allowNull: false,
        type:String,
        default: () => Math.floor(Math.random() * 1000000) // Initialize with a random nonce,
       
      },
    username: String,
    balance: {type: Number, default: 0},
    address: String,
    OauthId: String,
    OauthToken: String,
    email: String,
    oldTeamValue:{type: Number, default: 0},
    teamValue:{type: Number, default: 0},
    joined:{type: Date, default: Date.now},
    active:{type: Boolean,default: false},
    admin:   {type: Boolean,default: false},
    manager: {type: Boolean, default: false},
    players:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'player'
    }],
    teamPoints:{
        type: Number,
        default: 0
    },
    competitions:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'competition'
    }]
})
user.methods.getName = function(){
	return(this.username + ' '+ this.balance)
};
user.methods.getPointsTotal = function(){
    return (this.players.forEach(element => {
      return element;  
    }))
}

user.plugin(passportLocalMongoose)
module.exports = mongoose.model('user', user)