import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import './filtro.css'

export function ListGeneros() {
    const [selectedFilters, setSelectedFilters] = useState({
        autores: [],
        directores: [],
        producciones: [],
        generos: [],
        anios: [],
    });
    const navigate = useNavigate();

    const filters = {
        autores: [
            'Margot Robbie', 'Ryan Gosling', 'America Ferrera', 'Cillian Murphy', 
            'Emily Blunt', 'Matt Damon', 'Tom Cruise', 'Rebecca Ferguson',
            'Simon Pegg', 'Chris Pratt', 'Zoe Saldaña', 'Dave Bautista'
        ],
        directores: [
            'Greta Gerwig', 'Christopher Nolan', 'Christopher McQuarrie', 'James Gunn',
            'Joaquim Dos Santos', 'Kemp Powers', 'Kelsey Mann', 'Adam Wingard'
        ],
        producciones: [
            'Warner Bros. Pictures', 'Universal Pictures', 'Paramount Pictures',
            'Marvel Studios', 'Sony Pictures Animation', 'Pixar Animation Studios'
        ],
        generos: [
            'Acción', 'Animación', 'Anime', 'Aventura', 'Drama', 'Ciencia Ficción', 'Comedia'
        ],
        anios: ['2024', '2023', '2022'] 
    };

    const handleFilterChange = (category, filter) => {
        setSelectedFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters };
            if (updatedFilters[category].includes(filter)) {
                updatedFilters[category] = updatedFilters[category].filter((item) => item !== filter);
            } else {
                updatedFilters[category] = [...updatedFilters[category], filter];
            }
            return updatedFilters;
        });
    };

    const applyFilters = () => {
        const queryParams = Object.entries(selectedFilters)
            .filter(([_, values]) => values.length > 0)
            .map(([key, values]) => `${key}=${encodeURIComponent(values.join(','))}`)
            .join('&');
    
        // Navegar a la ruta que renderiza PeliculasPorGenero con los parámetros
        navigate(`/search?${queryParams}`);
    };

    const clearFilters = () => {
        setSelectedFilters({
            autores: [],
            directores: [],
            producciones: [],
            generos: [],
            anios: []
        });
        navigate(`/peliculas`); // Navegar a la vista original de todas las películas
    };

    return (
        <Fragment>
            <div className="filters-container">
                <h2 className="filters-title">Filtrar por</h2>
                {Object.keys(filters).map((category) => (
                    <div key={category}>
                        <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                        {filters[category].map((filter, index) => (
                            <label key={index}>
                                <input
                                    type="checkbox"
                                    checked={selectedFilters[category].includes(filter)}
                                    onChange={() => handleFilterChange(category, filter)}
                                />
                                {filter}
                            </label>
                        ))}
                    </div>
                ))}
                <div className="filter-buttons">
                    <button onClick={applyFilters}>Aplicar Filtros</button>
                    <button onClick={clearFilters}>Limpiar Filtros</button>
                </div>
            </div>
        </Fragment>
    );
}
