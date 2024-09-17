import React from "react";
import { Fragment } from "react";
import { FaSearch, FaUser, FaFilm } from 'react-icons/fa'; // Añadir iconos de búsqueda y perfil
import { Link } from 'react-router-dom'; // Si usas react-router para navegación interna

export function HeaderG() {
  return (
    <Fragment>
      <div className="navbar d-flex justify-content-between navbar-transparent align-items-center">
        {/* Logo o icono alineado a la izquierda */}
        <div className="navbar-brand-left d-flex align-items-center">
          <Link className="navbar-brand" to="/home">
            <FaFilm size={32} color="#ffffff" /> {/* Reemplaza con el icono que desees */}
          </Link>
        </div>

        {/* Menú centrado: Películas, Series, Nuevos Estrenos */}
        <div className="navbar-center d-flex justify-content-center">
          <ul className="navbar-nav d-flex flex-row">
            <li className="nav-item mx-3">
              <Link className="nav-link" to="/peliculas">Películas</Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link" to="/series">Series</Link>
            </li>
            <li className="nav-item mx-3">
              <Link className="nav-link" to="/estrenos">Nuevos Estrenos</Link>
            </li>
          </ul>
        </div>

        {/* Perfil e ícono de búsqueda alineados a la derecha */}
        <div className="navbar-right d-flex align-items-center">
          {/* Icono de búsqueda */}
          <form className="form-inline my-2 my-lg-0 d-flex align-items-center">
            <input className="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Search" />
            <button className="btn btn-transparent" type="submit">
              <FaSearch size={20} color="#ffffff" /> {/* Icono de lupa */}
            </button>
          </form>

          {/* Icono de perfil */}
          <Link to="/perfil" className="nav-link ml-3">
            <FaUser size={28} color="#ffffff" /> {/* Icono de perfil */}
          </Link>
        </div>
      </div>
    </Fragment>
  );
}