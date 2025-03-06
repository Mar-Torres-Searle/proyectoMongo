const multer = require("multer")

const memory = multer.memoryStorage()

const storage = multer.diskStorage({
    destination:  (req, file, callback) =>{
        console.log(file);
        const pathStorage = __dirname+"/../storage";
        callback(null, pathStorage) //error y destination
    },
    filename: (req, file, callback) => {
        //Tienen extensión jpg, pdf, mp4
        console.log(file);
        const ext = file.originalname.split(".").pop() //el último valor
        const filename = "file-"+Date.now()+"."+ext
        callback(null, filename)
    }
})


const errorMidelware=(err, req, res, next) => {
    const code = err.code || 500
    const message = err.message || "Error interno del servidor"
    res.status(400).send({message})    
}


const uploadMiddleware = multer({storage, limits: {fileSize: 1024*1024*5}})
const uploadMiddlewareMemory = multer({storage: memory, limits: {fileSize: 1024*5}})

module.exports = { uploadMiddleware, uploadMiddlewareMemory, errorMidelware}
