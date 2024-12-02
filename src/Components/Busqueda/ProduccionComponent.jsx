import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Fragment } from "react";
import axios from "axios";
import { Pelicula } from "../vistaPrincipal/Pelicula";
import { HeaderG } from "./HeaderG";
import { ListGeneros } from "./ListGeneros";
import { Calendario } from "./Calendario";

export function ProduccionComponent() {
    const { produccion } = useParams();
    const [peliculas, setPeliculas] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPeliculas = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/peliculas/produccion/${produccion}`);
                setPeliculas(response.data);
            } catch (err) {
                setError('No se pudieron cargar las películas para esta producción');
                console.error(err);
            }
        };
        fetchPeliculas();
    }, [produccion]);

    return (
        <Fragment>
            <div className="vista">
                <div className="container-fluid">
                    <HeaderG />
                    <div className="row">
                        <div className="col-2">
                            <div className="sidebar">
                                <Calendario />
                                <ListGeneros />
                            </div>
                        </div>
                        <div className="col">
                            <div className="estrenos-headera">
                                <h1>Películas de {produccion}</h1>
                            </div>
                            <div className="peliculas-container">
                                {error && <p>{error}</p>}
                                {peliculas.length > 0 ? (
                                    peliculas.map((pelicula) => (
                                        <div className="pelicula-card" key={pelicula.id}>
                                            <Pelicula pelicula={pelicula} />
                                        </div>
                                    ))
                                ) : (<p>No se encontraron películas.</p>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
