import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Pelicula } from "./Pelicula";
import { HeaderG } from "../Busqueda/HeaderG";
import "../../Lista.css"; // Ajusta la ruta según la ubicación


export function Lista() {
    const [peliculas, setPeliculas] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/peliculas")  
            .then(response => response.json())
            .then(data => setPeliculas(data))
            .catch(error => console.error("Error fetching movies:", error));
    }, []);

    return (
        <Fragment>
            <div className="vista">
                <div className="container-fluid">
                    <HeaderG />
                    <div className="peliculas-container">
                        {peliculas.map((pelicula) => (
                            <div className="pelicula-card" key={pelicula.id}>
                                <Pelicula pelicula={pelicula} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
