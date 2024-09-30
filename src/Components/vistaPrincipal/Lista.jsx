import React, { useEffect, useState } from "react";
import { Fragment } from "react";
import { Pelicula } from "./Pelicula";
import { HeaderG } from "../Busqueda/HeaderG";
import { ListGeneros } from "../Busqueda/ListGeneros";
import { Calendario } from "../Busqueda/Calendario";
import "../../Lista.css"; 


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
            <div className="vista ">
                <div className="container-fluid ">
                    <HeaderG />
                    <div class = "row mt-5" >
                        <div class = "col-2">
                            <div class = "sidebar">
                        
                                <Calendario />
                                <ListGeneros />
                            </div>
                        </div>
                        <div class = "col">
                           <h1 className="text-center">Bienvenido a Cuevana20</h1>
                        <div className="peliculas-container">
                            {peliculas.map((pelicula) => (
                                <div className="pelicula-card" key={pelicula.id}>
                                    <Pelicula pelicula={pelicula} />
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
