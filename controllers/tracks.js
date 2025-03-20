const TracksModel = require("../models/tracks.js")
const { matchedData } = require('express-validator')
const { handleHttpError } = require('../utils/handleError')


/*const createItem = async (req, res) => {
    const { body } = req
    //console.log(body)
    const data = await
    tracksModel.create(body)
    res.send(data)
}*/

const createItem = async (req, res) => {
    try {
        const body = matchedData(req) //El dato filtrado por el modelo (probar con body=req)
        const data = await (await TracksModel.create(body)).populate('mediaId')
        console.log("Recurso track creado", data)
        res.send(data)
    }catch(err){
        handleHttpError(res, 'ERROR_CREATE_ITEMS')
    }
}

const getItems = async (req, res) => {
    try{
        console.log("Tracks encontrados")
        const data = await TracksModel.find({})
        res.send(data)
    }catch(err){
        //Si nos sirve el de por defecto que hemos establecido, no es necesario pasar el 403
        handleHttpError(res, 'ERROR_GET_ITEMS', 403)
   }
}

const getItem = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await TracksModel.findById(id).populate('mediaId');    
        if (!item) {
            return res.status(404).send({ message: 'Item not found' });
        }
        res.send({ data: item });
    } catch (error) {
        //res.status(500).send({ message: 'Server error' });
        handleHttpError(res, 'ERROR_GET_ITEM', 403)
    }
}

const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedItem) {
            return res.status(404).send({ message: 'Item not found' });
        }
        res.send({ data: updatedItem });
    } catch (error) {
        //res.status(500).send({ message: 'Server error' });
        handleHttpError(res, 'ERROR_UPDATE_ITEMS', 500)
    }
};

const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await tracksModel.deleteOne({ _id: id });
        res.send({ message: 'Item deleted successfully' });
    } catch (error) {
        handleHttpError(res, 'ERROR_DELETE_ITEM', 403)
    }
};

const deleteOne = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await Item.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).send({ message: 'Item not found' });
        }
        res.send({ message: 'Item deleted successfully' });
    } catch (error) {
        //res.status(500).send({ message: 'Server error' });
        handleHttpError(res, 'ERROR_DELETE_ITEM', 403)
    }
}



module.exports = { getItem, getItems, createItem, updateItem, deleteItem, deleteOne }