const express = require("express")
const routerStorage = express.Router();
//Lo moveremos a otro archivo en utils (helpers)
const { uploadMiddlewareMemory, errorMidelware} = require("../utils/handleStorage")
const { uploadImage } = require("../controllers/storage")
const {uploadMiddleware} = require("../utils/handleStorage")


routerStorage.post("/local", uploadMiddleware.single("image"), (req, res) => { //solo enviamos uno con .single, sino .multi
    res.send("test midelware")
    
})

routerStorage.post("/", uploadMiddlewareMemory.single("image"), errorMidelware, uploadImage) /*, (req, res) => { //solo enviamos uno con .single, sino .multi
    res.send("test midelware memory")
    
})*/


module.exports = {routerStorage};