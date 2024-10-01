import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Fragment } from "react";
import axios from "axios";
import { Pelicula } from "../vistaPrincipal/Pelicula";
import { HeaderG } from "./HeaderG";
import { ListGeneros } from "./ListGeneros";
import { Calendario } from "./Calendario";
export function PeliculasPorGenero() {
    const { genero } = useParams(); // Obtener el nombre del género desde la URL
    const [peliculas, setPeliculas] = useState([]);
    const [error, setError] = useState('');
    
    useEffect(() => {
        // Función para obtener las películas por género
        const fetchPeliculas = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/peliculas/genero/${genero}`);
                setPeliculas(response.data); // Guardar las películas obtenidas
            } catch (err) {
                setError('No se pudieron cargar las películas para este género');
                console.error(err);
            }
        };

        fetchPeliculas(); // Llamar a la función cuando se monta el componente
    }, [genero]);

    return (

        <Fragment>
            <div className="vista ">
                <div className="container-fluid ">
                    <HeaderG />
                    <div class = "row " >
                        <div class = "col-2">
                            <div class = "sidebar">
                        
                                <Calendario />
                                <ListGeneros />
                            </div>
                        </div>
                        <div class = "col">
                        <div className="estrenos-headera">
                            <h1>{genero}</h1>
                        </div>
                        <div className="peliculas-container">
                        {error && <p>{error}</p>}  {/* Mostrar el error si existe */}
                        {peliculas.length > 0 ? (
                            peliculas.map((pelicula) => (
                                <div className="pelicula-card" key={pelicula.id}>
                                    <Pelicula pelicula={pelicula} />
                                </div>
                            ))
                        ) : (
                            <p></p>
                        )}
                    </div>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </Fragment>
       
    );
}
