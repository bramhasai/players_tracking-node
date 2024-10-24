const mongoose=require('mongoose');

const player=mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    dob:{
        type:Date,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    },
    available:{
        type:Boolean,
        required:true
    }
})

module.exports=mongoose.model("Player",player);