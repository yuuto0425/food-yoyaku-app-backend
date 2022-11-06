const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userName :{
        type:String,
        required:true,
        unique:true,
    },
    email :{
        type:String,
        required:true,
        unique:true,
        max:50,
    },
    password:{
        type:String,
        required:true,
        min:6,
        max:120,
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
   
});
module.exports = mongoose.model("User",UserSchema);