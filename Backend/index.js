const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

//Llamado de rutas
const rutas_articulo = require("./routes/ArticuloRoute");

const app = express();
app.use(cors());
app.use(express.json());
app.options('*', cors());

app.use("/api", rutas_articulo);

const options = {
    useNewUrlParser: true,
    autoIndex: true,
    keepAlive: true,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4,
    useUnifiedTopology: true
}

mongoose.connect(process.env.DB, options, function (error) {
    if(error){
        console.log(error);
    }
})

app.listen(process.env.PORT, () => {
    console.log("Server is running "+process.env.PORT);
})

module.exports = app;
