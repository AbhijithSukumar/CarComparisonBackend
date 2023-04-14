import mongoose from "mongoose"

const schema=mongoose.Schema

const userSchema=new schema({
    UserName:String,
    Email:String,
    Phone:Number,
    Password:String
})

const userModel=mongoose.model("users",userSchema)

export default userModel