import React, { useState } from 'react';
import {useForm} from '../hooks/useForm';
import {Peticion} from '../hooks/Peticion';

const Crear = () => {

  const {formulario, enviado, cambiado} = useForm({});
  const [resultado, setResultado] = useState("no_enviado");

  const guardarArticulo = async(e) => {

    e.preventDefault();

    //Recoger datos del formulario
    let nuevoArticulo = formulario;

    //Guardar articulo en el backend
    const {datos} = await Peticion("http://localhost:3900/api/crear_articulo", "POST", nuevoArticulo);

    if(datos.status === "success"){

      setResultado("guardado");

    }else{

      setResultado("error");

    }

    //Subir imagen
    const fileInput = document.querySelector("#file");

    if(datos.status === "success" && fileInput.files[0]){

      setResultado("guardado");

      const formData = new FormData();

      formData.append('file0', fileInput.files[0]);

      const subida = await Peticion("http://localhost:3900/api/subir_imagen/"+datos.articulo._id, "POST", formData, true);

      if(subida.datos.status === "success"){

        setResultado("guardado");
  
      }else{
  
        setResultado("error");
  
      }

    }

  }

  return (
    <div className="crear-articulo">

      <h1>Formulario para crear un articulo</h1>

      <strong>{resultado == "guardado" ? "Articulo guardado!": ""}</strong>

      <strong>{resultado == "error" ? "No se ha podido guardar el articulo": ""}</strong>

      <br/>

      {/* Montar formulario */}
      <form className="formulario" onSubmit={guardarArticulo}>

        <div className="titulo">

          <label htmlFor="titulo">Titulo</label>
          <br/>
          <input type="text" name="titulo" placeholder="Escriba aqui el titulo de su articulo" onChange={cambiado} required/>
         
        </div>

        <div className="contenido">

          <label htmlFor="contenido">Descripcion</label>
          <br/>
          <textarea type="text" name="contenido" placeholder="Escriba aqui la descripcion de su articulo" onChange={cambiado} required/>
         
        </div>

        <div>

          <label htmlFor="file0">Imagen</label>
          <br/>
          <input className="imagen" type="file" name="file0" id="file" required/>

        </div>

        <input className="boton-enviar" type="submit" value="Guardar" />

      </form>

    </div>
  );
}

export default Crear;
