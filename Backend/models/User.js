const mongoose = require("mongoose");
const { Schema } = mongoose;

//Schema for database with user
const usersSchema = new Schema({
    name:{
        type:String,
        required:[true,"Please provide your name"]
    },
    email:{
        type:String,
        required:[true,"Please provide your email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please enter password"]
    },
    date:{
        type:Date,
        default:Date.now
    },
})

module.exports = mongoose.model("user", usersSchema);  //creating a model of the schema we created