import React from 'react';
import { useState, useEffect } from 'react';
import {Peticion} from '../hooks/Peticion';
import { useParams, Link } from 'react-router-dom';

const Busqueda = () => {

  const [articulos, setArticulos] = useState([]);
  const params = useParams();

  useEffect( () => {
    
    conseguirArticulos();

  }, []);

  const conseguirArticulos = async() => {

    const url = "http://localhost:3900/api/buscar/"+params.busqueda;

    let peticion = await fetch(url, {
      method: "GET"
    });

    let datos = await peticion.json();

    if(datos.status === "success"){

      setArticulos(datos.articulos);
      
    }

  }

  const eliminar = async(id) => {

    let {datos} = await Peticion("http://localhost:3900/api/eliminar_articulo/"+id, "DELETE"); 

    if(datos.status === "success"){

      let articulosActualizados = articulos.filter(articulo => articulo._id !== id);

      setArticulos(articulosActualizados);

      alert("Articulo eliminado!");

    }

  }

  return (

    <div className="articulos-item">
      
      {articulos.map(articulo => {

        return (

          <article key={articulo._id}>

            {articulo.imagen != "default.png" && <img src={"http://localhost:3900/api/imagen/"+articulo.imagen} alt="articulos" />}

            {articulo.imagen == "default.png" && <img src={'../../public/img/js.png'} alt="articulos" />}

            <div>

              <h3><Link to={"/articulo/"+articulo._id}>{articulo.titulo}</Link></h3>

            </div>

            <button className="editar"><Link className="edicion" to={"/editar/"+articulo._id}>Editar</Link></button>
            <button className="eliminar" onClick={() => {

              eliminar(articulo._id);

            }}>Eliminar</button>

          </article>

        );

      })}

    </div>

  );
}

export default Busqueda;
