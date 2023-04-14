import carModel from "../Model/carModel.js"
import companyModel from "../Model/companyModel.js"



export const Register = async (req, res) => {
    const { companyName, website, customerCareNo, email, password } = req.body

    const company = new companyModel({
        CompanyName: companyName,
        Website: website,
        CustomerCareNumber: customerCareNo,
        CompanyMail: email,
        Password: password,
        AdminApproved: false
    })

    await company.save()

    res.status(200).json("ok")
}

export const Login = async (req, res) => {
    const { username, password } = req.body

    console.log(req.body);

    let company = await companyModel.findOne({ CompanyName: username })

    console.log("company", company);

    if (company != null) {
        if (company.Password === password) {
            res.status(200).json({ company: company })
        }
        else {
            res.status(200).json("invalid password")
        }
    }
    else {
        res.status(200).json("invalid company")
    }
}

export const GetCompany = async (req, res) => {
    const id = req.query.id

    let company = await companyModel.findOne({ _id: id })

    res.status(200).json(company)
}

export const CreateCar = async (req, res) => {
    let extension=""
    if(req.file.mimetype==="image/jpeg")
    {
        extension='.jpeg'
    }
    else if(req.file.mimetype==="image/png")
    {
        extension='.png'
    }
    console.log(req.file.filename);
    console.log(req.file);
    console.log(req.body);
    let { CarName, ManDate, Mileage, FuelType, SeatCapacity, EngineCapacity, ShowRoomPrice, OnRoadPrice, colors, varient, _id } = req.body
    console.log("company_id",_id);
    let car = new carModel({
        CarName: CarName,
        ManDate: ManDate,
        Mileage: Mileage,
        FuelType: FuelType,
        SeatCapacity: SeatCapacity,
        EngineCapacity: EngineCapacity,
        ShowRoomPrice: ShowRoomPrice,
        Image: req.file.filename+extension,
        OnRoadPrice: OnRoadPrice,
        colors: colors,
        varient: varient,
        company: _id
    })
    console.log(car);
    await car.save()
    let car_data = await carModel.findOne({ CarName: CarName }).lean({})
    console.log(car_data);
    await companyModel.findByIdAndUpdate(_id, { $push: { Cars: car_data._id } })
    res.status(200).json(req.body)
}

export const GetCars =async(req,res)=>{
    let cars=await carModel.find().lean()
    console.log("cars",cars);
    res.status(200).json(cars)
}