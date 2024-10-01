import React, { useState } from "react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaUser, FaFilm, FaBell, FaSignOutAlt } from 'react-icons/fa'; // Añadir icono de notificación y salir
import { Link } from 'react-router-dom'; // Si usas react-router para navegación interna
import '../../a.css';

export function HeaderG() {
    const [notificaciones, setNotificaciones] = useState([
        "La película 'Mufasa' está por estrenarse.",
        "Te puede interesar: Las tortugas Ninja.",
    ]);

    const navigate = useNavigate();
    const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);

    const toggleNotificaciones = () => {
        setMostrarNotificaciones(!mostrarNotificaciones);
    };

    return (
        <Fragment>
            <div className="navbar d-flex justify-content-between navbar-transparent align-items-center ml-2 mb-4">
                <div className="navbar-brand-left d-flex align-items-center">
                    <Link className="navbar-brand" to="/peliculas">
                        <FaFilm size={32} color="#ffffff" />
                    </Link>
                </div>

                <div className="navbar-center d-flex justify-content-center">
                    <ul className="navbar-nav d-flex flex-row">
                        <li className="nav-item mx-3">
                            <Link className="nav-link large-text" to="/peliculas">Películas</Link>
                        </li>
                        <li className="nav-item mx-3">
                            <Link className="nav-link large-text" to="/estrenos">Recomendaciones</Link>
                        </li>
                    </ul>
                </div>

                <div className="navbar-right d-flex align-items-center">
                    {/* Icono de búsqueda */}
                    <form className="form-inline my-2 my-lg-0 d-flex align-items-center">
                        <input className="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Search" />
                        <button className="btn btn-transparent" type="submit">
                            <FaSearch size={20} color="#ffffff" />
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
                        {notificaciones.length > 0 && (
                            <span className="notification-badge">{notificaciones.length}</span>
                        )}

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
                    <div> <h1>    </h1></div>

                    {/* Icono de perfil */}
                    <Link to="/user" className="nav-link ml-5">
                        <FaUser size={28} color="#ffffff" />
                    </Link>

                    {/* Icono de salir */}
                    <FaSignOutAlt
                        size={28}
                        color="#ffffff"
                        className="cursor-pointer ml-5"
                        onClick={() => navigate('/login')}
                    />
                </div>
            </div>
        </Fragment>
    );
}
