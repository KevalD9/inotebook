const mongoose = require("mongoose");
const { Schema } = mongoose;

//Schema for database with notes
const notesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tag:{
        type:String,
        default:"General"
    },
    date:{
        type:Date,
        default:Date.now
    },
})

module.exports = mongoose.model("note", notesSchema);  //creating a model of the schema we created