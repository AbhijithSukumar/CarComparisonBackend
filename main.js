import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import CONNECTION from "./Database/connection.js"
import adminrouter from "./Router/adminRouter.js"
import companyrouter from "./Router/companyRouter.js"
import userrouter from "./Router/userRouter.js"

const app=express()

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use('/admin',adminrouter)
app.use('/company',companyrouter)
app.use('/user',userrouter)

CONNECTION()

app.listen(8000)