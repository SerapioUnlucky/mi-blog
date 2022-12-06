import React, { useState, useEffect } from 'react';
import {useForm} from '../hooks/useForm';
import {Peticion} from '../hooks/Peticion';
import { useParams } from 'react-router-dom';

const Editar = () => {
  
  const {formulario, enviado, cambiado} = useForm({});
  const [resultado, setResultado] = useState("no_enviado");

  const [articulo, setArticulo] = useState([]);
  const params = useParams();

  useEffect( () => {
    
    conseguirArticulo();

  }, []);

  const conseguirArticulo = async() => {

    const { datos } = await Peticion("http://localhost:3900/api/ver_articulo/"+params.id, "GET")

    if(datos.status === "success"){

      setArticulo(datos.articulo);
      
    }

  }

  const editarArticulo = async(e) => {

    e.preventDefault();

    //Recoger datos del formulario
    let nuevoArticulo = formulario;

    //Guardar articulo en el backend
    const {datos} = await Peticion("http://localhost:3900/api/actualizar_articulo/"+params.id, "PUT", nuevoArticulo);

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

      <h1>Formulario para editar el articulo "{articulo.titulo}"</h1>

      <strong>{resultado == "guardado" ? "Articulo guardado!": ""}</strong>

      <strong>{resultado == "error" ? "No se ha podido guardar el articulo": ""}</strong>

      <br/>

      {/* Montar formulario */}
      <form className="formulario" onSubmit={editarArticulo}>

        <div className="titulo">

          <label htmlFor="titulo">Titulo</label>
          <br/>
          <input type="text" name="titulo" placeholder="Escriba aqui el titulo de su articulo" defaultValue={articulo.titulo} onChange={cambiado} />
         
        </div>

        <div className="contenido">

          <label htmlFor="contenido">Descripcion</label>
          <br/>
          <textarea type="text" name="contenido" placeholder="Escriba aqui la descripcion de su articulo" defaultValue={articulo.contenido} onChange={cambiado} />
         
        </div>

        <div>

          <label htmlFor="file0">Imagen</label>
          
          <br/>
          
          {articulo.imagen != "default.png" && <img src={"http://localhost:3900/api/imagen/"+articulo.imagen} alt="articulos" />}
          {articulo.imagen == "default.png" && <img src={'../../public/img/js.png'} alt="articulos" />}
          
          <br/>
          
          <input className="imagen" type="file" name="file0" id="file" />

        </div>

        <input className="boton-enviar" type="submit" value="Editar" />

      </form>

    </div>
  );

}

export default Editar;
