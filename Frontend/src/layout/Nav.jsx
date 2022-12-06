import React from 'react';
import { NavLink } from 'react-router-dom';

const Nav = () => {
  return (

    <nav className='nav'>

      <ul>

        <li><NavLink to="/inicio">Inicio</NavLink></li>
        <li><NavLink to="/articulos">Articulos</NavLink></li>
        <li><NavLink to="/crear-articulos">Crear articulos</NavLink></li>
        <li><NavLink>Contacto</NavLink></li>

      </ul>

    </nav>

  );
}

export default Nav;
