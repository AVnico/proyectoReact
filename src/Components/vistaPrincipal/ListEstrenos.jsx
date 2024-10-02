import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Estreno } from "./Estreno";
import { HeaderG } from "../Busqueda/HeaderG";
import { ListGeneros } from "../Busqueda/ListGeneros";
import { Calendario } from "../Busqueda/Calendario";
import "../../ListEstrenos.css";

export function ListEstrenos() {
    const [estrenos, setEstrenos] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/estrenos")
            .then(response => response.json())
            .then(data => setEstrenos(data))
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
                                <ListGeneros />
                            </div>
                        </div>
                        <div class = "col">
                        <div class="estrenos-header">
                            <h1>Próximos Estrenos</h1>
                            <p>Las mejores series y películas que no te puedes perder</p>
                        </div>
                        <div className="estrenos-container">
                            {estrenos.map((estreno) => (
                                <div className="estreno-card" key={estreno.id}>
                                    <Estreno estreno={estreno} />
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
