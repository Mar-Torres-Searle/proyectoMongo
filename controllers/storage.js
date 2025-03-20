const { uploadToPinata } = require("../utils/handleUploadPFS")
const storageModel = require("../models/mysql/storage")

const createItem = async (req, res) => {
    const { body, file } = req

    const fileData = {
        filename: file.filename,
        url: process.env.PUBLIC_URL+"/"+file.filename
    }

    const data = await storageModel.create(fileData)
    res.send(data)
}


const uploadImage = async (req, res, next) => {

    try{

        const id = req.params.id
        const fileBuffer = req.file.buffer
        const fileName = req.file.originalname
        const pinataResponse = await uploadToPinata(fileBuffer, fileName)
        const ipfsFile = pinataResponse.IpfsHash
        const ipfs = `https://${process.env.PINATA_GATEWAY_URL}/ipfs/${ipfsFile}`
        const data = await storageModel.create({url: ipfs})//no se que hay que poner dentro del create  
        res.send(data)

    }catch(err){

        console.log(err)
        //res.status(500).send("ERROR_UPLOAD_COMPANY_IMAGE")
        //handleHttpError(res, "ERROR_UPLOAD_COMPANY_IMAGE")
        next(err)
    }
}
module.exports = {createItem, uploadImage}

