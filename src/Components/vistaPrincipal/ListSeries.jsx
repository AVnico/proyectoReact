import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Serie } from "./Serie";
import { HeaderG } from "../Busqueda/HeaderG";
import { ListGeneros } from "../Busqueda/ListGeneros";
import { Calendario } from "../Busqueda/Calendario";
import "../../Lista.css";

export function ListSeries() {
    const [series, setSeries] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/series")
            .then(response => response.json())
            .then(data => setSeries(data))
            .catch(error => console.error("Error fetching movies:", error));
    }, []);

    return (
        <Fragment>
            <div className="vista">
                <div className="container-fluid">
                    <HeaderG />
                    <div class="row">
                        <div class="col-2">
                            <div class="sidebar">
                                <h2 className="text-center">Nuevos Estrenos</h2>
                                <Calendario />
                            </div>
                        </div>
                        <div class="col">
                            <div className="peliculas-container">
                                {series.map((serie) => (
                                    <div className="pelicula-card" key={serie.id}>
                                        <Serie serie={serie} />
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </Fragment>
    );
}
