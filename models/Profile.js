const mongoose = require ("mongoose");

const ProfileSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    mainJobInterest:{
        type: String,
        required:true
    },
    bio:{
        type: String
    },
    experience:[{
        title:{
            type: String
        },
        expLvl:{
            type: String
        }
    }],
    social:{
        instagram:{
            type: String
        },
        facebook:{
            type: String
        }
    },
    bumps:[
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            }

        }
    ],
    date:{
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);