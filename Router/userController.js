import carModel from "../Model/carModel.js"
import userModel from "../Model/userModel.js"
import fs from "fs"
import { dirname } from "path"
import { fileURLToPath } from "url"
import path from "path"
import companyModel from "../Model/companyModel.js"

const __dirname = dirname(fileURLToPath(import.meta.url))

export const Login=async(req,res)=>{
    const {username,password}=req.body

    let user_data=await userModel.findOne({ UserName: username }).lean({})

    if(user_data!=null)
    {
        if(user_data.Password===password)
        {
            res.status(200).json({user:user_data})
        }
        else
        {
            res.status(200).json("invalid password")
        }
    }
    else
    {
        res.status(200).json("invalid user")
    }
}

export const Signup =async(req,res)=>{
    const {UserName,Email,Phone,Password}=req.body

    let user=new userModel({
        UserName:UserName,
        Email:Email,
        Phone:Phone,
        Password:Password
    })

    await user.save()

    res.status(200).json("ok")
}

export const Compare =async(req,res)=>{
    const{Budget,SeatCapacity,Mileage,Color,FuelType}=req.body
    let compared_cars=[]
    let image_names=[]
    let company_name=""
    const imagesDir=`${__dirname}/uploads`
    compared_cars=await carModel.find()
    let filtered_cars=compared_cars.filter((cars)=>{
        return cars.OnRoadPrice<=Budget&&cars.SeatCapacity===parseInt(SeatCapacity)&&cars.Mileage>=Mileage&&cars.colors[0].split(",").includes(Color)&&cars.FuelType===FuelType
    })
    console.log(filtered_cars)
    if(filtered_cars.length!=0)
    {
        // filtered_cars.forEach(async(cars)=>{
        //     image_names.push(cars.Image)
        // })

        for(let i=0;i<filtered_cars.length;i++)
        {
            let companyDetails=await companyModel.findOne(filtered_cars[i].company).lean({})
            company_name=companyDetails.CompanyName
            console.log(company_name);
            filtered_cars[i].companyName=company_name
        }

        console.log("filtered",filtered_cars);


        // const images=image_names.map(image_name=>{
        //     return{
        //         name:image_name,
        //         data:fs.readFileSync(path.join(imagesDir,image_name))
        //     }
        // })

        let compared_final_list=filtered_cars.map(cars=>{
            return {
                CarName:cars.CarName,
                ManDate:cars.ManDate,
                Mileage:cars.Mileage,
                FuelType:cars.FuelType,
                SeatCapacity:cars.SeatCapacity,
                EngineCapacity:cars.EngineCapacity,
                ShowRoomPrice:cars.ShowRoomPrice,
                Image:{name:cars.Image,data:fs.readFileSync(path.join(imagesDir,cars.Image))},
                OnRoadPrice:cars.OnRoadPrice,
                colors:cars.colors,
                varient:cars.varient,
                company:cars.companyName
            }
        })
       return res.status(200).json(compared_final_list)
    }

    return res.status(200).json("false")
}