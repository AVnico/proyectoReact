import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Fragment } from "react";
import { HeaderG } from "./HeaderG";
import { ListGeneros } from "./ListGeneros";
import { Pelicula } from "../vistaPrincipal/Pelicula";

export function PeliculasPorGenero() {
    const [peliculas, setPeliculas] = useState([]);
    const [error, setError] = useState('');
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const fetchPeliculas = async () => {
            try {
                // Convierte los parámetros de búsqueda en un objeto
                const queryParams = Object.fromEntries([...searchParams]);

                // Llama a la API usando axios.get
                const response = await axios.get('http://localhost:5000/api/peliculas/search', {
                    params: queryParams, // Envía los parámetros al backend
                });

                // Guarda las películas en el estado
                setPeliculas(response.data);
            } catch (err) {
                setError('Error al cargar películas');
                console.error(err);
            }
        };

        fetchPeliculas(); // Llama a la función fetchPeliculas
    }, [searchParams]);

    return (
        <Fragment>
            <div className="vista">
                <div className="container-fluid">
                    {/* Header */}
                    <HeaderG />

                    <div className="row">
                        <div className="col">
                            {/* Filtros */}
                            <ListGeneros />

                            {/* Contenedor de Películas */}
                            <div className="peliculas-container mt-4">
                                {error && <p>{error}</p>}
                                {peliculas.length > 0 ? (
                                    peliculas.map((pelicula) => (
                                        <div className="pelicula-card" key={pelicula.id}>
                                            <Pelicula pelicula={pelicula} />
                                        </div>
                                    ))
                                ) : (
                                    <p>No se encontraron resultados</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
