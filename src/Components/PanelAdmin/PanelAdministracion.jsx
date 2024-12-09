import React, { Fragment, useState, useEffect } from "react";
import './PanelAdministracion.css';
import { useNavigate } from "react-router-dom";

export function PanelAdministracion() {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isAddingNewMovie, setIsAddingNewMovie] = useState(false);
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        nombre: "",
        autores: "",
        director: "",
        duracion: "",
        genero_id: "",
        imagen_url: ""
    });

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = () => {
        fetch("http://localhost:5000/api/peliculas/todas") // Usamos el nuevo endpoint
            .then(response => response.json())
            .then(data => setMovies(data))
            .catch(error => console.error("Error fetching movies:", error));
    };

    const handleEditClick = (movie) => {
        setSelectedMovie(movie);
        setIsAddingNewMovie(false);
        setFormValues({
            nombre: movie.nombre,
            autores: movie.autores,
            director: movie.director,
            duracion: movie.duracion,
            genero_id: movie.genero_id,
            imagen_url: movie.imagen_url
        });
    };

    const handleAddNewClick = () => {
        setSelectedMovie(null);
        setIsAddingNewMovie(true);
        setFormValues({
            nombre: "",
            autores: "",
            director: "",
            duracion: "",
            genero_id: "",
            imagen_url: ""
        });
    };

    const handleDeleteClick = async (movieId) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta película?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://localhost:5000/api/peliculas/eliminarpel/${movieId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert("Película eliminada correctamente.");
                fetchMovies(); // Refrescar la lista de películas
            } else {
                const errorData = await response.json();
                alert(errorData.message || "Error al eliminar la película.");
            }
        } catch (error) {
            console.error("Error al eliminar la película:", error);
            alert("Error al eliminar la película.");
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();
        const payload = {
            id: selectedMovie ? selectedMovie.id : null,
            ...formValues
        };

        const url = isAddingNewMovie
            ? 'http://localhost:5000/api/peliculas/agregar' // Endpoint para agregar película
            : 'http://localhost:5000/api/peliculas/editarpel'; // Endpoint para editar película

        try {
            const response = await fetch(url, {
                method: isAddingNewMovie ? 'POST' : 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                fetchMovies(); 
                setSelectedMovie(null);
                setIsAddingNewMovie(false);
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
                        <div  style={{ display: "flex", marginLeft: "auto", gap: "10px" }}>
                        <button className="add-button" onClick={handleAddNewClick}>Agregar</button>
                        <button className="btn btn-secondary" onClick={() => navigate(`/peliculas`)}>Volver</button>
                        </div>
                        
                    </div>
                    <ul>
                        {movies.map(movie => (
                            <li key={movie.id}>
                                {movie.nombre}
                                <div style={{ display: "flex", marginLeft: "auto", gap: "10px" }}>
                                <button className="btn btn-primary " onClick={() => handleEditClick(movie)}>Editar</button>
                                <button className="btn btn-danger " onClick={() => handleDeleteClick(movie.id)}>Eliminar</button>
                                </div>
                                
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="details-panel">
                    {selectedMovie || isAddingNewMovie ? (
                        <form className="edit-form" onSubmit={handleSave}>
                            <h3>{isAddingNewMovie ? "Agregar Nueva Película" : "Editar Película"}</h3>
                            <div className="form-group">
                                <label>Nombre de la Película:</label>
                                <input
                                    type="text"
                                    name="nombre"
                                    value={formValues.nombre}
                                    onChange={(e) => setFormValues({ ...formValues, nombre: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Autores:</label>
                                <input
                                    type="text"
                                    name="autores"
                                    value={formValues.autores}
                                    onChange={(e) => setFormValues({ ...formValues, autores: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Director:</label>
                                <input
                                    type="text"
                                    name="director"
                                    value={formValues.director}
                                    onChange={(e) => setFormValues({ ...formValues, director: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Duración:</label>
                                <input
                                    type="text"
                                    name="duracion"
                                    value={formValues.duracion}
                                    onChange={(e) => setFormValues({ ...formValues, duracion: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Género (ID):</label>
                                <input
                                    type="text"
                                    name="genero_id"
                                    value={formValues.genero_id}
                                    onChange={(e) => setFormValues({ ...formValues, genero_id: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>URL Imagen:</label>
                                <input
                                    type="text"
                                    name="imagen_url"
                                    value={formValues.imagen_url}
                                    onChange={(e) => setFormValues({ ...formValues, imagen_url: e.target.value })}
                                />
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
