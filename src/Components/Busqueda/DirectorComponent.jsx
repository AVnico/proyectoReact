import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Pelicula } from "../vistaPrincipal/Pelicula";
import { HeaderG } from "./HeaderG";
import { ListGeneros } from "./ListGeneros";
import { Calendario } from "./Calendario";

export function DirectorComponent() {
    const { director } = useParams();
    const [peliculas, setPeliculas] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPeliculas = async () => {
            if (!director) {
                setError('Director no especificado');
                return;
            }

            try {
                const response = await axios.get(`http://localhost:5000/api/peliculas/director/${director}`);
                setPeliculas(response.data);
            } catch (err) {
                setError('No se pudieron cargar las películas para este director');
                console.error(err);
            }
        };

        fetchPeliculas();
    }, [director]);

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
                                <h1>Películas de {director}</h1>
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
