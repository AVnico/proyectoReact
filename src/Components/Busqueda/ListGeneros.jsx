import React, { Fragment } from "react";
import '../../a.css';
import { useNavigate } from "react-router-dom";

export function ListGeneros() {
    // Lista de géneros y URLs correspondientes
    const genres = [
        { name: 'Acción', url: '/genero/Acción' },
        { name: 'Animación', url: '/genero/Animación' },
        { name: 'Anime', url: '/genero/Anime' },
        { name: 'Aventura', url: '/genero/Aventura' },
        { name: 'Drama', url: '/genero/Drama' },
        { name: 'Ciencia Ficción', url: '/genero/Ciencia Ficción' },
        { name: 'Comedia', url: '/genero/Comedia' }
    ];
    
    const navigate = useNavigate();

    const handleGenreClick = (url) => {
        navigate(url);
    };

    return (
        <Fragment>
            <div className="generos-container">
                <h2 className="generos-title text-blue text-center">GÉNEROS</h2>
                <ul className="generos-list">
                    {genres.map((genre, index) => (
                        <li key={index} className="generos-item text-center">
                            <a href={genre.url} className="generos-link ">
                                {genre.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </Fragment>
    );
}

