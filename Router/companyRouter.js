import express from "express"
import { Register, Login, GetCompany, CreateCar,GetCars } from "./companyController.js"
const companyrouter = express.Router()
import multer from "multer"
import { dirname } from "path"
import { fileURLToPath } from "url"
import fs from "fs";
import path from "path"

const __dirname = dirname(fileURLToPath(import.meta.url))

const upload = multer({ dest: `${__dirname}/uploads/` })

const FindAndChangeExtension = (req, res, next) => {
    const folderPath = `${__dirname}/uploads`;
    let newExtension = '';
    if(req.file.mimetype==="image/jpeg")
    {
        newExtension='.jpeg'
    }
    else if(req.file.mimetype==="image/png")
    {
        newExtension='.png'
    }
    // read the contents of the folder
    fs.readdir(folderPath, (err, files) => {
        if (err) throw err;

        // loop through each file
        files.forEach((file) => {
            // construct the old and new file paths
            const oldPath = path.join(folderPath, file);
            const newPath = path.join(folderPath, path.parse(file).name + newExtension);

            // check if the file has the desired extension
            if (path.extname(file) !== newExtension) {
                // rename the file with the new extension
                fs.rename(oldPath, newPath, (err) => {
                    if (err) throw err;
                    console.log(`${file} has been renamed to ${path.parse(file).name + newExtension}`);
                });
            }
        });
    });

    next()
}

companyrouter.post('/login', Login)
companyrouter.post('/', Register)
companyrouter.get('/getCompany', GetCompany)
companyrouter.post('/addCar', upload.single('Image'),FindAndChangeExtension, CreateCar)
companyrouter.get('/getCars',GetCars)


export default companyrouter