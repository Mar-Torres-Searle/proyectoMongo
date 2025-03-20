const express = require("express")
const cors = require("cors")
const { sequelize, dbConnectMySql } = require("./config/mysql")
require('dotenv').config();

const {routerUsers} = require("./routers/routerUsers")
const {routerStorage} = require("./routers/routerStorage")
const {routerTracks} = require("./routers/routerTracks")
const {routerAuth} = require("./routers/routerAuth")
const app = express()

//Le decimos a la app de express() que use cors para evitar el error Cross-Domain (XD)
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("Servidor escuchando en el puerto " + port)
})

const dbConnect = require('./config/mongo')


if (process.env.ENGINE_DB === 'nosql'){
    dbConnect()
    // Crea las colecciones por defecto si no existieran
}else{
    dbConnectMySql()
    sequelize.sync() // Crea las tablas en la base de datos si no existieran
}
   


app.use("/api/users", routerUsers)
app.use("/api/storage", routerStorage)
app.use("/img", express.static("storage"))
app.use("/api/tracks", routerTracks)
app.use("/api/auth", routerAuth)

