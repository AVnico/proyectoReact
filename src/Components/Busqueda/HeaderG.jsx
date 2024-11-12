import React, { useState, useEffect, useCallback, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaUser, FaFilm, FaBell, FaSignOutAlt, FaCalendarAlt, FaTools } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Calendario } from "./Calendario";
import '../../a.css';

export function HeaderG() {
    const [notificaciones, setNotificaciones] = useState([
        "La película 'Mufasa' está por estrenarse.",
        "Te puede interesar: Las tortugas Ninja.",
    ]);
    const navigate = useNavigate();
    const [mostrarNotificaciones, setMostrarNotificaciones] = useState(false);
    const [mostrarCalendario, setMostrarCalendario] = useState(false);
    const toggleNotificaciones = () => {
        setMostrarNotificaciones(!mostrarNotificaciones);
    };
    const toggleCalendario = () => {
        setMostrarCalendario(!mostrarCalendario);
    };
    const [searchTerm, setSearchTerm] = useState("");
    const [resultados, setResultados] = useState([]);

    const handleSearch = useCallback(async (term) => {
        if (term.trim() === "") {
            setResultados([]);
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/peliculas/buscar/${term}`);
            if (!response.ok) {
                throw new Error('Error al buscar las películas');
            }
            const data = await response.json();
            setResultados(data);
        } catch (error) {
            console.error("Error en la búsqueda:", error);
            setResultados([]);
        }
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            handleSearch(searchTerm);
        }, 150);
        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, handleSearch]);

    return (
        <Fragment>
            <div className="navbar d-flex justify-content-between navbar-transparent align-items-center ml-2 mb-4">
                <div className="navbar-brand-left d-flex align-items-center">
                    {/* Aquí se podría agregar un logotipo si es necesario */}
                </div>
                <div className="navbar-center d-flex justify-content-center">
                    <ul className="navbar-nav d-flex flex-row">
                        <li className="nav-item mx-3">
                            <Link className="nav-link large-text" to="/peliculas">Películas</Link>
                        </li>
                        <li className="nav-item mx-3">
                            <Link className="nav-link large-text" to="/estrenos">Recomendaciones</Link>
                        </li>
                        <li className="nav-item mx-3 position-relative">
                            <span className="nav-link large-text cursor-pointer" onClick={toggleCalendario}>
                                Calendario <FaCalendarAlt size={16} />
                            </span>
                            {mostrarCalendario && (
                                <div className="calendar-bubble">
                                    <Calendario />
                                </div>
                            )}
                        </li>
                    </ul>
                </div>

                <div className="navbar-right d-flex align-items-center">
                    <form className="form-inline my-2 my-lg-0 d-flex align-items-center" onSubmit={handleSearch}>
                        <input className="form-control mr-sm-2"
                            type="search"
                            placeholder="Buscar"
                            aria-label="Search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="btn btn-transparent" type="submit">
                            <FaSearch size={20} color="#ffffff" />
                        </button>

                        {resultados.length > 0 && (
                            <ul className="search-results" style={{ listStyleType: 'none', padding: 0, margin: 0, textAlign: 'left' }}>
                                {resultados.map((resultado, index) => (
                                    <li key={index} style={{ margin: '1px 0' }}>
                                        <Link to={`/pelicula/${resultado.id}`} className="search-result-item" style={{ textDecoration: 'none', color: '#000', padding: '10px', display: 'block', background: '#f8f9fa', borderRadius: '5px' }}>
                                            {resultado.nombre}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </form>
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
                    <Link to="/user" className="nav-link ml-3">
                        <FaUser size={28} color="#ffffff" />
                    </Link>
                    <Link to="/panelAdmin" className="nav-link ml-3">
                        <FaTools size={28} color="#ffffff" title="Administración" />
                    </Link>
                    <FaSignOutAlt
                        size={28}
                        color="#ffffff"
                        className="cursor-pointer ml-3"
                        onClick={() => navigate('/login')}
                    />
                </div>
            </div>
        </Fragment>
    );
}
