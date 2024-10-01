import React, { useState, useEffect, useCallback, Fragment } from "react";
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
    };  //
    const [searchTerm, setSearchTerm] = useState(""); // Estado para manejar el término de búsqueda
    const [resultados, setResultados] = useState([]); // Estado para manejar los resultados de la búsqueda

    const handleSearch = useCallback(async (term) => {
        if (term.trim() === "") {
            setResultados([]); // Limpiar resultados si el campo está vacío
            return;
        }

        try {
            // Hacer la solicitud al backend
            const response = await fetch(`http://localhost:5000/api/peliculas/buscar/${term}`);

            if (!response.ok) {
                throw new Error('Error al buscar las películas');
            }

            const data = await response.json();
            setResultados(data); // Guardar los resultados en el estado
        } catch (error) {
            console.error("Error en la búsqueda:", error);
            setResultados([]); // Si hay un error, limpiar los resultados
        }
    },[]);

    // useEffect para manejar la búsqueda en tiempo real
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            handleSearch(searchTerm);
        }, 150); // Espera 300ms antes de realizar la búsqueda

        return () => clearTimeout(delayDebounceFn); // Limpiar el timeout
    }, [searchTerm, handleSearch]);

    //


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
                            <Link className="nav-link large-text" to="/recomendaciones">Recomendaciones</Link>
                        </li>
                    </ul>
                </div>

                <div className="navbar-right d-flex align-items-center">
                    {/* Icono de búsqueda */}
                    <form className="form-inline my-2 my-lg-0 d-flex align-items-center" onSubmit={handleSearch}>
                        <input className="form-control mr-sm-2"
                            type="search"
                            placeholder="Buscar"
                            aria-label="Search"
                            value={searchTerm} // El valor del input viene del estado
                            onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el estado conforme el usuario escribe

                        />
                        <button className="btn btn-transparent" type="submit">
                            <FaSearch size={20} color="#ffffff" /> {/* Icono de lupa */}
                        </button>

                        {/* Resultados de la búsqueda */}
                        {resultados.length > 0 && (
                            <ul className="search-results" style={{ listStyleType: 'none', padding: 0, margin: 0, textAlign: 'left'  }}>
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
