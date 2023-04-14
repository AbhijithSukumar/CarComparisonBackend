import mongoose from "mongoose"
import { DB_URL } from "./constants.js"

const CONNECTION = () =>{
    mongoose.connect(DB_URL)
}

export default CONNECTION