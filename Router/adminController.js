import companyModel from "../Model/companyModel.js"

export const Login = (req, res) => {
    const { username, password } = req.body

    if (username == "Admin" && password == "123") {
        res.status(200).json("ok")
    }
    else {
        res.status(200).json("denied")
    }
}

export const GetCompany = async (req, res) => {
    let company = await companyModel.find().lean({})
    res.status(200).json(company)
}

export const ApproveCompany = async(req, res) => {
    let id=req.query.id
    await companyModel.findByIdAndUpdate(id,{AdminApproved:true})

    res.status(200).json("ok")
}