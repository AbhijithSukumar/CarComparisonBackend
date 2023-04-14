import mongoose from "mongoose"

const schema=mongoose.Schema

const companySchema=new schema({
    CompanyName:String,
    Website:String,
    CustomerCareNumber:Number,
    CompanyMail:String,
    Password:String,
    AdminApproved:Boolean,
    Cars:[{type:schema.Types.ObjectId,ref:"cars"}]
})

const companyModel=mongoose.model("companies",companySchema)

export default companyModel