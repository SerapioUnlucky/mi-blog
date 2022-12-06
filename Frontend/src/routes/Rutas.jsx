import React from 'react';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom'; 
import Header from '../layout/Header';
import Articulos from '../pages/Articulos';
import Articulo from '../pages/Articulo';
import Inicio from '../pages/Inicio';
import Nav from '../layout/Nav';
import Footer from '../layout/Footer';
import Buscador from '../layout/Buscador';
import Crear from '../pages/Crear';
import Busqueda from '../pages/Busqueda';
import Editar from '../pages/Editar'

const Rutas = () => {
  return (

    <BrowserRouter>
        {/* Layout */}
        <Header />
        <Nav />
        <Buscador />

        {/* Contenido central y rutas */}
        <section className="layout">

            <Routes>

                <Route path="/" element={<Inicio/>} />
                <Route path="/inicio" element={<Inicio/>} />
                <Route path="/articulos" element={<Articulos/>} />
                <Route path="/articulo/:id" element={<Articulo/>} />
                <Route path="/crear-articulos" element={<Crear/>} />
                <Route path="/buscar/:busqueda" element={<Busqueda/>} />
                <Route path="/editar/:id" element={<Editar/>} />

                <Route path="*" element={
                  <div className="header">
                    <h1>Error 404</h1>
                  </div>
                } />

            </Routes>

        </section>

        {/* Footer */}
        <Footer />

    </BrowserRouter>
    
  );
}

export default Rutas;
