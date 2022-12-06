const Articulo = require("../models/Articulo");
const {validarArticulo} = require("../helpers/Validaciones");
const fs = require("fs");
const path = require("path");

const crearArticulo = (req, res) => {

    //Recoger parametros por post a guardar
    let parametros = req.body;

    //Validar datos
    try{

        validarArticulo(parametros);
        
    }catch(error){

        return res.status(400).json({

            status: "error",
            mensaje: "Faltan datos por enviar"

        });

    }

    //Crear el objeto a guardar
    const articulo = new Articulo(parametros);

    //Guardar el articulo en la base de datos
    articulo.save((error, articuloGuardado) => {

        if(error || !articuloGuardado){

            return res.status(400).json({

                status: "error",
                mensaje: "No se ha guardado el articulo"

            });

        }

        return res.status(200).json({

            status: "success",
            articulo: articuloGuardado,
            mensaje: "Articulo guardado"

        });

    });    

}

const conseguirArticulos = (req, res) => {

    Articulo.find({}).sort({fecha: -1}).exec((error, articulos) => {

        //Si no existen articulos devolver error
        if(error || !articulos){
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

    });

}

const conseguirArticulo = (req, res) => {

    //Recoger un id por la url
    let id = req.params.id;

    //Buscar el articulo
    Articulo.findById(id, (error, articulo) => {

        //Si no existe devolver error
        if(error || !articulo){
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

    });

}

const eliminarArticulo = (req, res) => {

    let articulo_id = req.params.id;

    Articulo.findOneAndDelete({_id: articulo_id}, (error, articuloEliminado) => {

        if(error || !articuloEliminado){
            return res.status(404).json({
                status: "error",
                mensaje: "Error al eliminar el articulo"
            });
        }

        return res.status(200).json({
            status: "success",
            articulo: articuloEliminado,
            mensaje: "Articulo eliminado"
        });

    });

}

const actualizarArticulo = (req, res) => {

    //Recoger id del articulo a editar
    let articulo_id = req.params.id;

    //Recoger datos del body
    let parametros = req.body;

    //Validar datos
    try{

        validarArticulo(parametros);
        
    }catch(error){
        return res.status(400).json({
            status: "error",
            mensaje: "Faltan datos por enviar"
        });
    }

    //Buscar y actualizar articulo
    Articulo.findOneAndUpdate({_id: articulo_id}, parametros, {new: true},(error, articuloActualizado) => {

        //En caso de error
        if(error || !articuloActualizado){
            return res.status(500).json({
                status: "error",
                mensaje: "Error al actualizar"
            })
        }

        //Devolver respuesta exitosa
        return res.status(200).json({
            status: "success",
            articulo: articuloActualizado
        });

    });

}

const subirImagen = (req, res) => {

    //Recoger el fichero de imagen subido
    if(!req.file){
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
    if(imagenExtension != "png" && imagenExtension != "jpg" && imagenExtension != "jpeg"){
        
        //borrar archivo, actualizar el articulo
        fs.unlink(req.file.path, (error) => {

            return res.status(400).json({

                status: "error",
                mensaje: "Archivo invalido"

            });

        });

    }else{


        //Recoger id del articulo a editar
        let articulo_id = req.params.id;

        //Buscar y actualizar articulo
        Articulo.findOneAndUpdate({_id: articulo_id}, {imagen: req.file.filename}, {new: true},(error, articuloActualizado) => {

            //En caso de error
            if(error || !articuloActualizado){
                return res.status(500).json({
                    status: "error",
                    mensaje: "Error al actualizar"
                })
            }

            //Devolver respuesta exitosa
            return res.status(200).json({
                status: "success",
                articulo: articuloActualizado
            });

        });

    }    

}

const conseguirImagen = (req, res) => {

    let fichero = req.params.fichero;
    let ruta_fisica = "./imagenes/articulos/"+fichero;

    fs.stat(ruta_fisica, (error, existe) => {
        if(existe){
            return res.sendFile(path.resolve(ruta_fisica));
        }else{
            return res.status(404).json({
                status: "error",
                mensaje: "La imagen no existe"
            });
        }
    });

}

const buscador = (req, res) => {
    //Sacar el string de busqueda
    let busqueda = req.params.busqueda;

    //Find OR
    Articulo.find({ "$or": [

        {"titulo": {"$regex": busqueda, "$options": "i" }},
        {"contenido": {"$regex": busqueda, "$options": "i" }},

    ]}).sort({fecha: -1}).exec((error, articulosEncontrados) => {

        if(error || !articulosEncontrados){

            return res.status(404).json({

                status: "error",
                mensaje: "No se han encontrado articulos"

            });

        }

        return res.status(200).json({

            status: "success",
            articulos: articulosEncontrados

        });

    });

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