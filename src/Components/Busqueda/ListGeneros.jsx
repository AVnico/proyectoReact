import React, { Fragment, useState } from "react";
import '../Busqueda/filtro.css';
import { useNavigate } from "react-router-dom";

export function ListGeneros() {
    const [selectedFilters, setSelectedFilters] = useState([]);
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

    const handleFilterClick = (category, filter) => {
        const url = `/${category}/${filter}`;
        navigate(url);
    };

    return (
        <Fragment>
            <div className="filters-container">
                <h2 className="filters-title text-blue text-center">Filtrar por</h2>
                
                <Accordion title="Autores">
                    {filters.autores.map((autor, index) => (
                        <li key={index} className="filter-item">
                            <label className="filter-checkbox">
                                <input
                                    type="checkbox"
                                    onChange={() => handleFilterClick('autor', autor)}
                                />
                                {autor}
                            </label>
                        </li>
                    ))}
                </Accordion>

                <Accordion title="Directores">
                    {filters.directores.map((director, index) => (
                        <li key={index} className="filter-item">
                            <label className="filter-checkbox">
                                <input
                                    type="checkbox"
                                    onChange={() => handleFilterClick('director', director)}
                                />
                                {director}
                            </label>
                        </li>
                    ))}
                </Accordion>

                <Accordion title="Producciones">
                    {filters.producciones.map((produccion, index) => (
                        <li key={index} className="filter-item">
                            <label className="filter-checkbox">
                                <input
                                    type="checkbox"
                                    onChange={() => handleFilterClick('produccion', produccion)}
                                />
                                {produccion}
                            </label>
                        </li>
                    ))}
                </Accordion>

                <Accordion title="Géneros">
                    {filters.generos.map((genero, index) => (
                        <li key={index} className="filter-item">
                            <label className="filter-checkbox">
                                <input
                                    type="checkbox"
                                    onChange={() => handleFilterClick('genero', genero)}
                                />
                                {genero}
                            </label>
                        </li>
                    ))}
                </Accordion>

                <Accordion title="Años">
                    {filters.anios.map((anio, index) => (
                        <li key={index} className="filter-item">
                            <label className="filter-checkbox">
                                <input
                                    type="checkbox"
                                    onChange={() => handleFilterClick('anio', anio)}
                                />
                                {anio}
                            </label>
                        </li>
                    ))}
                </Accordion>
            </div>
        </Fragment>
    );
}

function Accordion({ title, children }) {
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="accordion">
            <button className="accordion-button" onClick={toggleAccordion}>
                {title} 
            </button>
            {isOpen && (
                <ul className="accordion-content">
                    {children}
                </ul>
            )}
        </div>
    );
}
