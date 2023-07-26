const Articulo = require("../models/Articulo");
const { validarArticulo } = require("../helpers/Validaciones");
const fs = require("fs");
const path = require("path");

const crearArticulo = async (req, res) => {

    //Recoger parametros por post a guardar
    let parametros = req.body;

    try {

        //Validar datos
        try {

            validarArticulo(parametros);

        } catch (error) {

            return res.status(400).json({

                status: "error",
                mensaje: "Faltan datos por enviar"

            });

        }

        //Crear el objeto a guardar
        const articulo = new Articulo(parametros);

        //Guardar el articulo en la base de datos
        const articuloGuardado = await articulo.save();

        //Si no se ha guardado el articulo devolver error
        if (!articuloGuardado) {

            return res.status(400).json({

                status: "error",
                mensaje: "No se ha guardado el articulo"

            });

        }

        //Devolver respuesta exitosa
        return res.status(200).json({

            status: "success",
            mensaje: "Articulo guardado",
            articulo: articuloGuardado,

        });

    } catch (error) {

        return res.status(500).json({

            status: "error",
            mensaje: "Error en el servidor"

        });

    }

}

const conseguirArticulos = async (req, res) => {

    try {

        const articulos = await Articulo.find({}).sort({ fecha: -1 });

        //Si no existen articulos devolver error
        if (!articulos) {

            return res.status(404).json({
                status: "error",
                mensaje: "No se han encontrado articulos"
            });

        }

        //Si existen devolver resultado
        return res.status(200).send({
            status: "success",
            articulos
        });

    } catch (error) {

        return res.status(500).json({
            status: "error",
            mensaje: "Error en el servidor"
        });

    }

}

const conseguirArticulo = async (req, res) => {

    //Recoger un id por la url
    let id = req.params.id;

    try {

        //Buscar el articulo
        const articulo = await Articulo.findById(id);

        //Si no existe devolver error
        if (!articulo) {

            return res.status(404).json({
                status: "error",
                mensaje: "No se ha encontrado el articulo"
            });

        }

        //Si existe devolver resultado
        return res.status(200).json({
            status: "success",
            articulo
        });

    } catch (error) {

        return res.status(500).json({
            status: "error",
            mensaje: "Error en el servidor"
        });

    }

}

const eliminarArticulo = async (req, res) => {

    //Recoger id del articulo a eliminar
    let articulo_id = req.params.id;

    try {

        //Eliminar el articulo
        const articuloEliminado = await Articulo.findOneAndDelete(articulo_id);

        //Si no se ha eliminado el articulo devolver error
        if (!articuloEliminado) {

            return res.status(404).json({
                status: "error",
                mensaje: "Error al eliminar el articulo"
            });

        }

        //Devolver respuesta exitosa
        return res.status(200).json({
            status: "success",
            mensaje: "Articulo eliminado",
            articulo: articuloEliminado
        });

    } catch (error) {

        return res.status(500).json({
            status: "error",
            mensaje: "Error en el servidor"
        });

    }

}

const actualizarArticulo = async (req, res) => {

    //Recoger id del articulo a editar
    let articulo_id = req.params.id;

    //Recoger datos del body
    let parametros = req.body;

    try {

        //Validar datos
        try {

            validarArticulo(parametros);

        } catch (error) {

            return res.status(400).json({
                status: "error",
                mensaje: "Faltan datos por enviar"
            });

        }

        //Buscar y actualizar articulo
        const articuloActualizado = await Articulo.findOneAndUpdate({ _id: articulo_id }, parametros, { new: true });

        //Si no se ha actualizado el articulo devolver error
        if (!articuloActualizado) {

            return res.status(404).json({
                status: "error",
                mensaje: "Error al actualizar el articulo"
            });

        }

        //Devolver respuesta exitosa
        return res.status(200).json({
            status: "success",
            mensaje: "Articulo actualizado",
            articulo: articuloActualizado
        });

    } catch (error) {

        return res.status(500).json({
            status: "error",
            mensaje: "Error en el servidor"
        });

    }

}

const subirImagen = async (req, res) => {

    //Recoger el fichero de imagen subido
    if (!req.file) {

        return res.status(404).json({
            status: "error",
            mensaje: "Peticion invalida"
        });

    }

    //Nombre del archivo
    let nombreimagen = req.file.originalname;

    //Extension del archivo
    let imagenSplit = nombreimagen.split("\.");
    let imagenExtension = imagenSplit[1];

    //Comprobar extension correcta
    if (imagenExtension != "png" && imagenExtension != "jpg" && imagenExtension != "jpeg") {

        //borrar archivo, actualizar el articulo
        fs.unlink(req.file.path, (error) => {

            return res.status(400).json({

                status: "error",
                mensaje: "Archivo invalido"

            });

        });

    } else {


        //Recoger id del articulo a editar
        let articulo_id = req.params.id;

        try {

            const articuloActualizado = await Articulo.findOneAndUpdate({ _id: articulo_id }, { imagen: req.file.filename }, { new: true });

            //Si no se ha actualizado el articulo devolver error
            if (!articuloActualizado) {

                return res.status(404).json({
                    status: "error",
                    mensaje: "Error al actualizar el articulo"
                });

            }

            //Devolver respuesta exitosa
            return res.status(200).json({
                status: "success",
                mensaje: "Articulo actualizado",
                articulo: articuloActualizado
            });

        } catch (error) {

            return res.status(500).json({
                status: "error",
                mensaje: "Error en el servidor"
            });

        }

    }

}

const conseguirImagen = (req, res) => {

    let fichero = req.params.fichero;
    let ruta_fisica = "./imagenes/articulos/" + fichero;

    fs.stat(ruta_fisica, (error, existe) => {

        if (existe) {

            return res.sendFile(path.resolve(ruta_fisica));

        } else {

            return res.status(404).json({
                status: "error",
                mensaje: "La imagen no existe"
            });

        }

    });

}

const buscador = async (req, res) => {

    //Sacar el string de busqueda
    let busqueda = req.params.busqueda;

    try {

        //Buscar articulos
        const articulosEncontrados = await Articulo.find({
            "$or": [

                { "titulo": { "$regex": busqueda, "$options": "i" } },
                { "contenido": { "$regex": busqueda, "$options": "i" } },

            ]
        }).sort({ fecha: -1 });

        //Si no existen articulos devolver error
        if (!articulosEncontrados) {

            return res.status(404).json({
                status: "error",
                mensaje: "No se han encontrado articulos"
            });

        }

        //Si existen devolver resultado
        return res.status(200).json({
            status: "success",
            articulos: articulosEncontrados
        });


    } catch (error) {

        return res.status(500).json({
            status: "error",
            mensaje: "Error en el servidor"
        });

    }

}

module.exports = {
    crearArticulo,
    conseguirArticulos,
    conseguirArticulo,
    eliminarArticulo,
    actualizarArticulo,
    subirImagen,
    conseguirImagen,
    buscador
}