const express = require("express");
const multer = require("multer");
const ArticuloController = require("../controllers/ArticuloController");

const router = express.Router();
const almacenamiento = multer.diskStorage({

    destination: function(req, file, cb){
        cb(null, './imagenes/articulos/')
    },

    filename: function(req, file, cb){
        cb(null, "articulo" + Date.now() + file.originalname)
    }

});

const subidas = multer({storage: almacenamiento});

//Ruta post
router.post("/crear_articulo", ArticuloController.crearArticulo);
router.post("/subir_imagen/:id", [subidas.single("file0")], ArticuloController.subirImagen);

//Ruta get
router.get("/ver_articulos", ArticuloController.conseguirArticulos);
router.get("/ver_articulo/:id", ArticuloController.conseguirArticulo);
router.get("/imagen/:fichero", ArticuloController.conseguirImagen);
router.get("/buscar/:busqueda", ArticuloController.buscador);

//ruta delete
router.delete("/eliminar_articulo/:id", ArticuloController.eliminarArticulo);

//ruta put
router.put("/actualizar_articulo/:id", ArticuloController.actualizarArticulo);

module.exports = router;
