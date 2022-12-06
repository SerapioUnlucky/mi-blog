const validator = require("validator");

const validarArticulo = (parametros) => {

    let validar_titulo = !validator.isEmpty(parametros.titulo) &&
                        validator.isLength(parametros.titulo, {min: 4, max: undefined});
    let validar_contenido = !validator.isEmpty(parametros.contenido);

    if(!validar_titulo || !validar_contenido){
        throw new Error("No se ha validado la informacion");
    }

}

module.exports = {
    validarArticulo
}