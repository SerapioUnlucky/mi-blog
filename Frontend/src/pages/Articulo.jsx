import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Peticion } from '../hooks/Peticion';

const Articulo = () => {

  const [articulo, setArticulo] = useState([]);
  const params = useParams();

  useEffect( () => {
    
    conseguirArticulo();

  }, []);

  const conseguirArticulo = async() => {

    const { datos, cargando } = await Peticion("http://localhost:3900/api/ver_articulo/"+params.id, "GET")

    if(datos.status === "success"){

      setArticulo(datos.articulo);
      
    }

  }

  return (
    <div className="articulo-item">

      {articulo.imagen != "default.png" && <img src={"http://localhost:3900/api/imagen/"+articulo.imagen} alt="articulos" />}

      {articulo.imagen == "default.png" && <img src={'../../public/img/js.png'} alt="articulos" />}
      
      <h1>{articulo.titulo}</h1>
      <h2>{articulo.fecha}</h2>
      <p>{articulo.contenido}</p>
      
    </div>
  );
}

export default Articulo;
