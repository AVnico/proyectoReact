import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";

export function SerIndividual() {
    const { id } = useParams();
    const [serie, setSerie] = useState(null);
    const [loading, setLoading] = useState(true);
    const fetchSerie = async () => {
        try {
            console.log("ID de película:", id);
            const response = await fetch(`http://localhost:5000/api/series/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setSerie(data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching movie details:", error);
            setLoading(false);
        }
    };
    const formatFecha = (fecha) => {
        const date = new Date(fecha);
        return date.toISOString().split('T')[0];
    };

    useEffect(() => {
        fetchSerie();
    }, [id]);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!serie) {
        return <p>No se encontró la película.</p>;
    }

    return (
        <Fragment>
            <div className="movie-container justify-content-center text-center mt-4">
                <article className="info" itemScope itemType="https://schema.org/Movie">
                    <figure className="poster content-center">
                        <img
                            itemProp="image"
                            src={serie.imagen_url}
                            alt={serie.nombre}
                            loading="lazy"
                            className="poster-image"
                            style={{ width: '650px', height: 'auto' }}
                        />
                    </figure>
                    <header className="info-header">
                        <h1 itemProp="name">{serie.nombre}</h1>
                    </header>
                    <div className="descripción" itemProp="description">
                        <p>{serie.descripcion}</p>
                    </div>
                    <div className="autores">
                        <p><strong>Directores:</strong> <span itemProp="director">{serie.director}</span></p>
                        <p><strong>Reparto:</strong> <span itemProp="actor">{serie.autores}</span></p>
                    </div>
                    <div className="info-adicional">
                        <p><strong>Género:</strong> <span>{serie.genero_nombre}</span></p>
                        <p><strong>Duración:</strong> <span>{serie.duracion}</span></p>
                        <p><strong>Fecha de publicación:</strong> <span itemProp="datePublished">{formatFecha(serie.fecha_publicacion)}</span></p>
                    </div>
                </article>
            </div>
        </Fragment>
    );
}
