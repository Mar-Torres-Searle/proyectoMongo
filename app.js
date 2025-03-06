const express = require("express")
const cors = require("cors")
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

dbConnect()


app.use("/api/users", routerUsers)
app.use("/api/storage", routerStorage)
app.use("/img", express.static("storage"))
app.use("/api/tracks", routerTracks)
app.use("/api/auth", routerAuth)