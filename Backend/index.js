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

app.listen(process.env.PORT, () => console.log('Servidor corriendo en el puerto: ' + process.env.PORT));

mongoose.connect(process.env.DB).then(() => console.log('Conexión a la base de datos establecida')).catch(err => console.log(err));

module.exports = app;
