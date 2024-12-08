import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Serie } from "./Serie";
import { HeaderG } from "../Busqueda/HeaderG";
import { FiltroPeliculas } from "../Busqueda/FiltroPeliculas"; 
import "../../Lista.css";

export function ListSeries() {
    const [series, setSeries] = useState([]); // Series a mostrar

    const fetchSeries = (filtros = null) => {
        const esInfantil = parseInt(localStorage.getItem('esInfantil'), 10); // Obtener preferencia como número
        const url = filtros
            ? "http://localhost:5000/api/series/filtrar"
            : `http://localhost:5000/api/series?esInfantil=${esInfantil}`;

        fetch(url, {
            method: filtros ? "POST" : "GET",
            headers: filtros ? { "Content-Type": "application/json" } : undefined,
            body: filtros ? JSON.stringify({ ...filtros, esInfantil }) : undefined,
        })
            .then((response) => response.json())
            .then((data) => setSeries(data))
            .catch((error) => console.error("Error fetching series:", error));
    };

    useEffect(() => {
        fetchSeries(); // Fetch inicial para todas las series según esInfantil
    }, []);

    const manejarFiltros = (filtrosSeleccionados) => {
        fetchSeries(filtrosSeleccionados); 
    };

    const limpiarFiltros = () => {
        fetchSeries(); 
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
                                <p>Las mejores series que no te puedes perder...</p>
                            </div>
                            <div>
                                <FiltroPeliculas onFiltrar={manejarFiltros} onLimpiar={limpiarFiltros} />
                            </div>
                            <div className="peliculas-container">
                                {series.length > 0 ? (
                                    series.map((serie) => (
                                        <div className="pelicula-card" key={serie.id}>
                                            <Serie serie={serie} />
                                        </div>
                                    ))
                                ) : (
                                    <p>No se encontraron series que coincidan con los filtros seleccionados.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
