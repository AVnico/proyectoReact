import React, { Fragment, useState } from "react";
import './PanelAdministracion.css';
import { useNavigate } from "react-router-dom";

export function PanelAdministracion() {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isAddingNewMovie, setIsAddingNewMovie] = useState(false);

    const movies = [
        { id: 1, name: "Película 1", authors: "Autor 1", director: "Director 1", year: "2020", genre: "Acción", imageUrl: "" },
        { id: 2, name: "Película 2", authors: "Autor 2", director: "Director 2", year: "2021", genre: "Comedia", imageUrl: "" },
   
    ];
    const navigate = useNavigate();
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
                                {movie.name}
                                <button onClick={() => handleEditClick(movie)}>Editar</button>
                            </li>
                        ))}
                    </ul>
                    <button className="btn btn-danger " onClick={() => navigate(`/peliculas`)}>Volver</button>
                </div>
                <div className="details-panel">
                    {selectedMovie ? (
                        <form className="edit-form">
                            <h3>{isAddingNewMovie ? "Agregar Nueva Película" : "Editar Película"}</h3>
                            <div className="form-group">
                                <label>Nombre de la Película:</label>
                                <input type="text" defaultValue={selectedMovie.name} />
                            </div>
                            <div className="form-group">
                                <label>Autores:</label>
                                <input type="text" defaultValue={selectedMovie.authors} />
                            </div>
                            <div className="form-group">
                                <label>Director:</label>
                                <input type="text" defaultValue={selectedMovie.director} />
                            </div>
                            <div className="form-group">
                                <label>Año:</label>
                                <input type="text" defaultValue={selectedMovie.year} />
                            </div>
                            <div className="form-group">
                                <label>Género:</label>
                                <input type="text" defaultValue={selectedMovie.genre} />
                            </div>
                            <div className="form-group">
                                <label>URL Imagen:</label>
                                <input type="text" defaultValue={selectedMovie.imageUrl} />
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
