import mongoose from "mongoose";

const cardSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    background:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    quote:{
        type:String,
        required:true
    },
    hashtags:[{
        type:String
    }]
})

export const Card=new mongoose.model("Card",cardSchema)