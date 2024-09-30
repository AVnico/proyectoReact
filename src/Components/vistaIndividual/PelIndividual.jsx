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
                    <figure className="poster content-center mt-3">
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

            <div className="video-container mb-3" style={styles.videoContainer}>
        {/* Barra superior con botones */}
        <div className="top-bar" style={styles.topBar}>
          <button style={styles.button}>
       
            Español Latino <span style={styles.quality}>CALIDAD HD</span>
          </button>


          <button style={styles.button}>
            Descargar <span style={styles.quality}>CALIDAD HD</span>
          </button>
        </div>
        {/* Reproductor de video */}
        <div className="video-player" style={styles.videoPlayer}>
          <div className="play-button" style={styles.playButton}>
            <span style={styles.playIcon}>▶</span>
          </div>
        </div>
      </div>
        </Fragment>
    );
}
const styles = {
    videoContainer: {
      backgroundColor: "#1c1e21", // Fondo oscuro
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    },
    topBar: {
      display: "flex",
      justifyContent: "center",
      marginBottom: "15px",
      gap: "10px",
    },
    button: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#0056b3",
      color: "#ffffff",
      padding: "10px 20px",
      borderRadius: "5px",
      border: "none",
      cursor: "pointer",
      fontSize: "14px",
      fontWeight: "bold",
    },
    icon: {
      width: "20px",
      height: "20px",
      marginRight: "10px",
    },
    quality: {
      marginLeft: "5px",
      fontSize: "12px",
    },
    videoPlayer: {
      width: "100%",
      height: "500px",
      backgroundColor: "#000000", // Negro para la simulación del video
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    playButton: {
      width: "80px",
      height: "80px",
      backgroundColor: "rgba(255, 255, 255, 0.2)", // Fondo semitransparente
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
    },
    playIcon: {
      fontSize: "30px",
      color: "#ffffff", // Color del icono de play
    },
  };