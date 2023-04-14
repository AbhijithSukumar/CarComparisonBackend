import express from "express"
import { Login,GetCompany,ApproveCompany } from "./adminController.js"
const adminrouter=express.Router()

adminrouter.post('/',Login)
adminrouter.get('/getCompany',GetCompany)
adminrouter.get('/approveCompany',ApproveCompany)

export default adminrouter