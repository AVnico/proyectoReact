import React, { useState } from "react";
import { Fragment } from "react";
import { FaSearch, FaUser, FaFilm, FaBell } from 'react-icons/fa'; // Añadir icono de notificación
import { Link } from 'react-router-dom'; // Si usas react-router para navegación interna
import '../../a.css';

export function HeaderG() {
    const [notificaciones, setNotificaciones] = useState([
        "La película 'The Killer's Game' está por estrenarse.",
        "Te puede interesar: 'The Shade'.",
    ]);

    const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);

    const toggleNotificaciones = () => {
        setMostrarNotificaciones(!mostrarNotificaciones);
    };

    return (
        <Fragment>
            <div className="navbar d-flex justify-content-between navbar-transparent align-items-center ml-2 mb-4">
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

                {/* Perfil, búsqueda y notificaciones alineados a la derecha */}
                <div className="navbar-right d-flex align-items-center">
                    {/* Icono de búsqueda */}
                    <form className="form-inline my-2 my-lg-0 d-flex align-items-center">
                        <input className="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Search" />
                        <button className="btn btn-transparent" type="submit">
                            <FaSearch size={20} color="#ffffff" /> {/* Icono de lupa */}
                        </button>
                    </form>

                    {/* Icono de notificaciones */}
                    <div className="position-relative ml-3">
                        <FaBell 
                            size={28} 
                            color="#ffffff" 
                            className="cursor-pointer"
                            onClick={toggleNotificaciones} 
                        />
                        {/* Si hay notificaciones, muestra el círculo rojo */}
                        {notificaciones.length > 0 && (
                            <span className="notification-badge">{notificaciones.length}</span>
                        )}

                        {/* Menú desplegable de notificaciones */}
                        {mostrarNotificaciones && (
                            <div className="notification-menu">
                                <ul className="list-unstyled">
                                    {notificaciones.map((notif, index) => (
                                        <li key={index} className="notification-item">
                                            {notif}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Icono de perfil */}
                    <Link to="/user" className="nav-link ml-3">
                        <FaUser size={28} color="#ffffff" /> {/* Icono de perfil */}
                    </Link>
                </div>
            </div>
        </Fragment>
    );
}
