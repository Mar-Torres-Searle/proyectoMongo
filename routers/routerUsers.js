const express = require('express');
const routerUsers = express.Router();

routerUsers.use(express.json());

const {createItem, getItem, getItems, updateItem, deleteItem} = require("../controllers/user.js")

/*routerUsers.get('/', (req,res) => {
    console.log("Peticion recibida")
    res.send("hola mundo")
})*/

routerUsers.post('/', createItem)

//hacer get item, get items, put item, delete item by id

routerUsers.get('/:email', getItem)

routerUsers.get('/', getItems)


routerUsers.put('/:email', (req, res) => {
    console.log(req.params);
    updateItem(req, res);
});



routerUsers.delete('/:email', deleteItem);



module.exports = {routerUsers};