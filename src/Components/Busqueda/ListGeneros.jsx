import React, { Fragment } from "react";
import '../../a.css';

export function ListGeneros() {
    // Lista de géneros y URLs correspondientes
    const genres = [
        { name: 'Accion', url: '/accion' },
        { name: 'Animacion', url: '/animacion' },
        { name: 'Anime', url: '/anime' },
        { name: 'Aventura', url: '/aventura' },
        { name: 'Drama', url: '/drama' },
        { name: 'Ciencia Ficcion', url: '/ciencia-ficcion' },
        { name: 'Comedia', url: '/comedia' },
        { name: 'Fantasia', url: '/fantasia' }
    ];

    return (
        <Fragment>
            <div className="generos-container">
                <h2 className="generos-title text-primary">GÉNEROS</h2>
                <ul className="generos-list">
                    {genres.map((genre, index) => (
                        <li key={index} className="generos-item">
                            <a href={genre.url} className="generos-link">
                                {genre.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </Fragment>
    );
}

