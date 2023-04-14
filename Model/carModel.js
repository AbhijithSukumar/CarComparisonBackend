import mongoose from "mongoose"

const schema=mongoose.Schema

const carSchema=new schema({
    CarName:String,
    ManDate:String,
    Mileage:Number,
    FuelType:String,
    SeatCapacity:Number,
    EngineCapacity:String,
    ShowRoomPrice:Number,
    Image:String,
    OnRoadPrice:Number,
    colors:[String],
    varient:String,
    company:{type:schema.Types.ObjectId,ref:"companies"}
})

const carModel=mongoose.model("cars",carSchema)

export default carModel