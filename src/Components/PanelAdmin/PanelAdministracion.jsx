import React, { Fragment, useState, useEffect } from "react";
import './PanelAdministracion.css';
import { useNavigate } from "react-router-dom";

export function PanelAdministracion() {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isAddingNewMovie, setIsAddingNewMovie] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch de las películas desde la API
        fetch("http://localhost:5000/api/peliculas")
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(error => console.error("Error fetching movies:", error));
    }, []);

    const handleEditClick = (movie) => {
        setSelectedMovie(movie);
        setIsAddingNewMovie(false);
    };

    const handleAddNewClick = () => {
        setSelectedMovie({
            id: null,
            name: "",
            authors: "",
            director: "",
            year: "",
            genre: "",
            imageUrl: ""
        });
        setIsAddingNewMovie(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
    
        const payload = {
            id: selectedMovie.id, // Será null para nuevas películas
            nombre: e.target[0].value,
            autores: e.target[1].value,
            director: e.target[2].value,
            duracion: e.target[3].value,
            genero_id: parseInt(e.target[4].value), // Convierte a número si es necesario
            imagen_url: e.target[5].value
        };
    
        try {
            const response = await fetch('http://localhost:5000/api/editarpel', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                alert(data.message);
                // Refrescar la lista de películas
                fetch("http://localhost:5000/api/peliculas")
                    .then(response => response.json())
                    .then(data => setMovies(data));
                setSelectedMovie(null); // Limpia el formulario
            } else {
                alert(data.message || 'Error al guardar la película');
            }
        } catch (error) {
            console.error('Error al guardar la película:', error);
            alert('Error al guardar la película');
        }
    };
    

    return (
        <Fragment>
            <div className="admin-panel">
                <div className="sidebar">
                    <div className="sidebar-header">
                        <h3>Películas</h3>
                        <button className="add-button" onClick={handleAddNewClick}>Agregar</button>
                    </div>
                    <ul>
                        {movies.map(movie => (
                            <li key={movie.id}>
                                {movie.nombre}
                                <button className="btn btn-primary" onClick={() => handleEditClick(movie)}>Editar</button>
                            </li>
                        ))}
                    </ul>
                    <button className="btn btn-danger" onClick={() => navigate(`/peliculas`)}>Volver</button>
                </div>
                <div className="details-panel">
                    {selectedMovie ? (
                        <form className="edit-form" onSubmit={handleSave}>
                        <h3>{isAddingNewMovie ? "Agregar Nueva Película" : "Editar Película"}</h3>
                        <div className="form-group">
                            <label>Nombre de la Película:</label>
                            <input type="text" defaultValue={selectedMovie.nombre} />
                        </div>
                        <div className="form-group">
                            <label>Autores:</label>
                            <input type="text" defaultValue={selectedMovie.autores} />
                        </div>
                        <div className="form-group">
                            <label>Director:</label>
                            <input type="text" defaultValue={selectedMovie.director} />
                        </div>
                        <div className="form-group">
                            <label>Duración:</label>
                            <input type="text" defaultValue={selectedMovie.duracion} />
                        </div>
                        <div className="form-group">
                            <label>Género (ID):</label>
                            <input type="text" defaultValue={selectedMovie.genero_id} />
                        </div>
                        <div className="form-group">
                            <label>URL Imagen:</label>
                            <input type="text" defaultValue={selectedMovie.imagen_url} />
                        </div>
                        <button type="submit" className="save-button">Guardar</button>
                    </form>
                    
                    ) : (
                        <p>Seleccione una película para editar o agregue una nueva</p>
                    )}
                </div>
            </div>
        </Fragment>
    );
}
