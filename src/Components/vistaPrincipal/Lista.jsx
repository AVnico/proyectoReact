import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Pelicula } from "./Pelicula";
import { HeaderG } from "../Busqueda/HeaderG";
import { FiltroPeliculas } from "../Busqueda/FiltroPeliculas";
import "../../Lista.css";

export function Lista() {
    const [peliculas, setPeliculas] = useState([]); // Películas a mostrar

    const fetchPeliculas = (filtros = null) => {
        const esInfantil = parseInt(localStorage.getItem('esInfantil'), 10); // Obtener preferencia como número
        const url = filtros
            ? `http://localhost:5000/api/peliculas/filtrar`
            : `http://localhost:5000/api/peliculas?esInfantil=${esInfantil}`;

        fetch(url, {
            method: filtros ? "POST" : "GET",
            headers: filtros ? { "Content-Type": "application/json" } : undefined,
            body: filtros ? JSON.stringify({ ...filtros, esInfantil }) : undefined,
        })
            .then((response) => response.json())
            .then((data) => setPeliculas(data))
            .catch((error) => console.error("Error fetching movies:", error));
    };

    useEffect(() => {
        fetchPeliculas(); // Fetch inicial para todas las películas según esInfantil
    }, []);

    const manejarFiltros = (filtrosSeleccionados) => {
        fetchPeliculas(filtrosSeleccionados); // Fetch con filtros adicionales
    };

    const limpiarFiltros = () => {
        fetchPeliculas(); // Restaurar todas las películas basadas solo en esInfantil
    };

    return (
        <Fragment>
            <div className="vista">
                <div className="container-fluid">
                    <HeaderG />
                    <div className="row">
                        <div className="col">
                            <div className="estrenos-headera">
                                <h1>BIENVENIDO A CUEVANA20</h1>
                                <p>Las mejores series y películas que no te puedes perder...</p>
                            </div>
                            <div>
                                <FiltroPeliculas onFiltrar={manejarFiltros} onLimpiar={limpiarFiltros} />
                            </div>
                            <div className="peliculas-container">
                                {peliculas.length > 0 ? (
                                    peliculas.map((pelicula) => (
                                        <div className="pelicula-card" key={pelicula.id}>
                                            <Pelicula pelicula={pelicula} />
                                        </div>
                                    ))
                                ) : (
                                    <p>No se encontraron películas que coincidan con los filtros seleccionados.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
