const mongoose = require('mongoose')

const db_uri = process.env.NODE_ENV ==='test' ? process.env.DB_URI : process.env.DB_URI_TEST

const dbConnect = () => {
    mongoose.set('strictQuery', false)
    mongoose.connect(db_uri)
}
/*const dbConnect = () => {
    const db_uri = process.env.DB_URI
    mongoose.set('strictQuery', false)
    try{
        mongoose.connect(db_uri)
    }catch(error){
        console.err("Error conectando a la BD:", error)
    }
    //Listen events
    mongoose.connection.on("connected",() => console.log("Conectado a la BD"))
}*/
module.exports = dbConnect

//hacer npm start 
//probar a cambiar una letra de DB_URI y ver si nos da error