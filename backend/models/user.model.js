import mongoose from 'mongoose'

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
        // Role can only be changed directly in database, not during registration
    }
})

const User=new mongoose.model("User",userSchema)

export default User