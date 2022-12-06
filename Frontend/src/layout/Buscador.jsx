import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

  const [buscar, setBuscar] = useState();

  const navegar = useNavigate();

  const hacerBusqueda = (e) => {

    let mi_busqueda = e.target.search_field.value;

    navegar("/buscar/"+mi_busqueda, { replace: true });

  }

  return (
    
    <aside className="search-box">

        <form className="search-form" onSubmit={hacerBusqueda}>

          <input type="text" className="search-field" name="search_field" placeholder="Escribe aqui para buscar" />

          <input type='submit' className='search-button' id="search-button" value="Buscar" />

        </form>

    </aside>

  );
}

export default Sidebar;
