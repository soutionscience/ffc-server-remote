const mongoose= require('mongoose');
const schema = mongoose.Schema;
// const userTeam = require('./userTeams')


let feedback = new schema({
   sender: {type: mongoose.Schema.Types.ObjectId,
        ref: 'user'},
    // username: String,
    // email: String,   
    title:String,
    message: String,
    read:{type: Boolean, default: false},
    replied:{type: Boolean, default: false}
});


module.exports = mongoose.model('feedback', feedback)