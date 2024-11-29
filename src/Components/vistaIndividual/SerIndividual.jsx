import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function SerIndividual() {
    const { id } = useParams();
    const [serie, setSerie] = useState(null);
    const [temporadas, setTemporadas] = useState([]); // Temporadas de la serie
    const [capitulos, setCapitulos] = useState([]); // Capítulos de la temporada seleccionada
    const [loading, setLoading] = useState(true);
    const [selectedTemporada, setSelectedTemporada] = useState(null); // Temporada seleccionada
    const navigate = useNavigate();
    // Obtener los detalles de la serie
    const fetchSerie = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/series/${id}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setSerie(data);
        } catch (error) {
            console.error("Error fetching series details:", error);
        } finally {
            setLoading(false);
        }
    };

    // Obtener las temporadas de la serie
    const fetchTemporadas = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/series/${id}/temporadas`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setTemporadas(data);
        } catch (error) {
            console.error("Error fetching seasons:", error);
        }
    };

    // Obtener los capítulos de una temporada seleccionada
    const fetchCapitulos = async (temporadaId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/series/temporadas/${temporadaId}/capitulos`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setCapitulos(data);
        } catch (error) {
            console.error("Error fetching episodes:", error);
        }
    };

    // Manejar el cambio de temporada seleccionada
    const handleTemporadaChange = (e) => {
        const temporadaId = e.target.value;
        setSelectedTemporada(temporadaId);
        fetchCapitulos(temporadaId); // Cargar los capítulos de la temporada seleccionada
    };

    useEffect(() => {
        fetchSerie();
        fetchTemporadas();
    }, [id]);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!serie) {
        return <p>No se encontró la serie.</p>;
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
                            style={{ width: "650px", height: "auto" }}
                        />
                    </figure>
                    <header className="info-header">
                        <h1 itemProp="name">{serie.nombre}</h1>
                    </header>
                    <div className="descripción" itemProp="description">
                        <p>{serie.descripcion}</p>
                    </div>
                    <div className="autores">
                        <p>
                            <strong>Directores:</strong> <span itemProp="director">{serie.director}</span>
                        </p>
                        <p>
                            <strong>Reparto:</strong> <span itemProp="actor">{serie.autores}</span>
                        </p>
                    </div>
                </article>

                {/* Dropdown de temporadas */}
                <div className="temporadas-dropdown mt-4">
                    <label htmlFor="temporadas"><strong>Seleccionar Temporada:</strong></label>
                    <select id="temporadas" onChange={handleTemporadaChange} defaultValue="">
                        <option value="" disabled>
                            -- Selecciona una temporada --
                        </option>
                        {temporadas.map((temporada) => (
                            <option key={temporada.id} value={temporada.id}>
                                Temporada {temporada.numero_temporada}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Lista de capítulos */}
                {capitulos.length > 0 && (
                    <div className="capitulos mt-4">
                        <h3>Capítulos:</h3>
                        <ul>
                            {capitulos.map((capitulo) => {
                                console.log("Capítulo:", capitulo); // Depuración
                                return (
                                    <li key={capitulo.numero_capitulo}>
                                        <strong>{capitulo.numero_capitulo}:</strong> {capitulo.titulo} ({capitulo.duracion})
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => navigate(`/series/capitulos/${capitulo.id}`)}> Ver
                                        </button>
                                    </li>
                                );
                            })}

                        </ul>
                    </div>
                )}
            </div>
        </Fragment>
    );
}
