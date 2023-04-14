import express from "express"
import { Login,Signup,Compare } from "./userController.js"
const userrouter=express.Router()

userrouter.post('/login',Login)
userrouter.post('/signup',Signup)
userrouter.post('/comparison',Compare)

export default userrouter