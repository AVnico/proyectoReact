import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";

export function CapituloIndividual() {
    const { id } = useParams(); // Obtenemos el ID del capítulo desde la URL
    const [capitulo, setCapitulo] = useState(null);
    const [loading, setLoading] = useState(true);

    // Función para obtener los detalles del capítulo
    const fetchCapitulo = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/series/capitulos/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setCapitulo(data);
        } catch (error) {
            console.error("Error fetching chapter details:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCapitulo(); 
    }, [id]);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!capitulo) {
        return <p>No se encontró el capítulo.</p>;
    }

    return (
        <Fragment>
            <div className="chapter-container justify-content-center text-center mt-4">
                <article className="info" itemScope itemType="https://schema.org/Episode">
                    <figure className="poster content-center">
                       
                    </figure>
                    <header className="info-header">
                        <h1 itemProp="name">{capitulo.titulo}</h1>
                    </header>
                    <div className="info-adicional">
                        <p>
                            <strong>Número de capítulo:</strong> <span>{capitulo.numero_capitulo}</span>
                        </p>
                        <p>
                            <strong>Duración:</strong> <span>{capitulo.duracion}</span>
                        </p>
                    </div>
                </article>
            </div>
        </Fragment>
    );
}
