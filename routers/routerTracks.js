const express = require("express")
const routerTracks = express.Router();
routerTracks.use(express.json());

const { validatorCreateItem } = require("../validators/tracks")
const {createItem, getItems, getItem} = require("../controllers/tracks")
const {customHeader} = require("../middleware/customHeader")

/*routerTracks.get("/", (req, res) => {
    const data = ["hola", "mundo", "tracks"]
    res.send({data})
})*/



//routerTracks.post('/', createItem)

routerTracks.get("/:id", getItem)
routerTracks.get("/", getItems)

routerTracks.post("/", validatorCreateItem, customHeader, createItem)

routerTracks.put("/:id", updateItem)

routerTracks.delete("/:id", deleteItem)


module.exports = {routerTracks}