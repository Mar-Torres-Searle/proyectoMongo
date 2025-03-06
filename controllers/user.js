const UserModel = require("../models/users.js")

const createItem = async (req,res) => {
    const result = await UserModel.create(req.body)
    console.log("Recurso creado", result)
    res.status(201).json(result)
}

const getItem = async (req,res) => {
    const {email} = req.params
    const result = await UserModel.findOne({email})
    res.status(200).json(result)
}

//Terminar el getItems, updateItem(o replaceItem) y deleteItem

const getItems = async (req, res) => {
    console.log("Usuarios encontrados");
    const data = await UserModel.find();
    res.json(data);   
}


const updateItem =  async (req, res) => {
    
    const email = req.params.email;
    const data = await UserModel.findOneAndReplace(
        {email}, 
        req.body);
    res.json(data)
}

const deleteItem = async (req, res) => {
    console.log("delete log",req.params.email)
    const data = await UserModel.findOneAndDelete({email: req.params.email})
    res.json(data)
}

module.exports = {createItem, getItem, getItems, updateItem, deleteItem}