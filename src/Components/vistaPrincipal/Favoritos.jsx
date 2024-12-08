import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Pelicula } from "./PeliculaFav";
import { HeaderG } from "../Busqueda/HeaderG";

import "../../Lista.css";

export function Favoritos() {
    const [favoritos, setFavoritos] = useState([]);
    const usuario_id = localStorage.getItem('usuario_id'); // Obtener el ID del usuario del localStorage

    useEffect(() => {
        if (!usuario_id) {
            console.error("Usuario no encontrado en localStorage");
            return;
        }

        fetch(`http://localhost:5000/api/autenticacion/favoritos/${usuario_id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al obtener los favoritos");
                }
                return response.json();
            })
            .then(data => setFavoritos(data))
            .catch(error => console.error("Error fetching favorites:", error));
    }, [usuario_id]);

    return (
        <Fragment>
            <div className="vista">
                <div className="container-fluid">
                    <HeaderG />
                    <div className="row">
                        <div className="col">
                            <div className="estrenos-headera">
                                <h1>Tus Películas Favoritas</h1>
                                <p>Las películas que más te han gustado...</p>
                            </div>
                  
                            <div className="peliculas-container">
                                {favoritos.length > 0 ? (
                                    favoritos.map((pelicula) => (
                                        <div className="pelicula-card" key={pelicula.id}>
                                            <Pelicula pelicula={pelicula} />
                                        </div>
                                    ))
                                ) : (
                                    <p>No tienes películas favoritas aún.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
