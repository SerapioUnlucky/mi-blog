import React from 'react';
import { Link } from 'react-router-dom';

const Inicio = () => {
  return (

    <div className="inicio">

      <h1>Bienvenido al blog con React</h1>

      <p>Blog desarrollado con el MERN Stack (Mongo, Express, React y Node)</p>
      
      <Link to="/articulos">Ver los articulos</Link>
      
    </div>

  );
}

export default Inicio;
