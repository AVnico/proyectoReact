import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";

export function PelIndividual() {
    const { id } = useParams(); // Obtener el ID de la película desde la URL
    const [pelicula, setPelicula] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchPelicula = async () => {
        try {
            console.log("ID de película:", id);
            const response = await fetch(`http://localhost:5000/api/peliculas/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setPelicula(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching movie details:", error);
            setLoading(false);
        }
    };

    const formatFecha = (fecha) => {
        const date = new Date(fecha);
        return date.toISOString().split('T')[0]; // Devuelve solo la parte de la fecha
    };

    useEffect(() => {
        fetchPelicula();
    }, [id]);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!pelicula) {
        return <p>No se encontró la película.</p>;
    }

    return (
        <Fragment>
            <div className="movie-container justify-content-center text-center mt-4">
                <article className="info" itemScope itemType="https://schema.org/Movie">
                    <figure className="poster content-center">
                        <img
                            itemProp="image"
                            src={pelicula.imagen_url}
                            alt={pelicula.nombre}
                            loading="lazy"
                            className="poster-image"
                            style={{ width: '650px', height: 'auto' }} // Ajusta el tamaño aquí
                        />
                    </figure>

                    <header className="info-header">
                        <h1 itemProp="name">{pelicula.nombre}</h1>
                    </header>

                    <div className="descripción" itemProp="description">
                        <p>{pelicula.descripcion}</p>
                    </div>

                    <div className="autores">
                        <p><strong>Directores:</strong> <span itemProp="director">{pelicula.director}</span></p>
                        <p><strong>Reparto:</strong> <span itemProp="actor">{pelicula.autores}</span></p>
                    </div>

                    <div className="info-adicional">
                        <p><strong>Género:</strong> <span>{pelicula.genero_nombre}</span></p>
                        <p><strong>Duración:</strong> <span>{pelicula.duracion}</span></p>
                        <p><strong>Fecha de publicación:</strong> <span itemProp="datePublished">{formatFecha(pelicula.fecha_publicacion)}</span></p>
                    </div>

                </article>
            </div>
        </Fragment>
    );
}
