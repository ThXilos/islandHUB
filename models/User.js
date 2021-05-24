const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    isBussinesOwner:{
        type: Boolean,
        default: false
    },
    avatar:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum:["pending","active"],
        default: "pending"
    },
    confirmationCode:{
        type: String,
        unique: true
    }

});

module.exports = User = mongoose.model("user", UserSchema);