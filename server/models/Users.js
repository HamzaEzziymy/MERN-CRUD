// importation mongoose modulle
const mongoose = require("mongoose");

// Schema
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    age:{
        type:Number,
    },
    email:{
        type:String,
    }
})

// modul users
const UserModel = mongoose.model("users", UserSchema)

// exportation modull users
module.exports = UserModel;