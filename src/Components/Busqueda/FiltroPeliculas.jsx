import React, { useState } from "react";

export function FiltroPeliculas({ onFiltrar, onLimpiar }) {
    // Valores predefinidos basados en tu base de datos
    const opciones = {
        autores: [
            "Margot Robbie", "Ryan Gosling", "Cillian Murphy",
            "Tom Cruise", "Keanu Reeves", "Antonio Banderas",
        ],
        directores: [
            "Greta Gerwig", "Christopher Nolan", "James Gunn",
            "Denis Villeneuve", "Chad Stahelski",
        ],
        años: ["2023", "2024", "2022"],
        generos: ["Acción", "Comedia", "Ciencia Ficción", "Animación"],
    };

    const [filtrosSeleccionados, setFiltrosSeleccionados] = useState({
        autores: [],
        directores: [],
        años: [],
        generos: [],
    }); // Filtros seleccionados por el usuario
    const [mostrarFiltro, setMostrarFiltro] = useState(false); // Controlar el desplegable

    const handleCheckboxChange = (tipo, valor) => {
        setFiltrosSeleccionados((prev) => {
            const yaSeleccionado = prev[tipo].includes(valor);
            const nuevoFiltro = yaSeleccionado
                ? prev[tipo].filter((item) => item !== valor) // Eliminar si ya está seleccionado
                : [...prev[tipo], valor]; // Agregar si no está seleccionado
            return { ...prev, [tipo]: nuevoFiltro };
        });
    };

    const aplicarFiltros = () => {
        onFiltrar(filtrosSeleccionados); // Enviar filtros seleccionados al componente padre
        setMostrarFiltro(false); // Cerrar el menú desplegable
    };

    const limpiarFiltros = () => {
        setFiltrosSeleccionados({
            autores: [],
            directores: [],
            años: [],
            generos: [],
        }); // Limpiar selección
        onLimpiar(); // Llamar al método para restaurar todas las películas
    };

    return (
        <div style={{ margin: "1rem 0" }}>
            <button
                onClick={() => setMostrarFiltro((prev) => !prev)}
                style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                }}
            >
                {mostrarFiltro ? "Ocultar Filtros" : "Mostrar Filtros"}
            </button>

            {mostrarFiltro && (
                <div style={{
                    padding: "1rem",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    marginTop: "1rem",
                    backgroundColor: "#f8f9fa"
                }}>
                    {Object.keys(opciones).map((tipo) => (
                        <div key={tipo} style={{ marginBottom: "1rem" }}>
                            <h4 style={{ color: "#495057", marginBottom: "0.5rem" }}>
                                {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                            </h4>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                                {opciones[tipo].map((valor) => (
                                    <label
                                        key={valor}
                                        style={{
                                            display: "inline-block",
                                            marginRight: "1rem",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <input
                                            type="checkbox"
                                            value={valor}
                                            onChange={() => handleCheckboxChange(tipo, valor)}
                                            style={{ marginRight: "0.5rem" }}
                                        />
                                        {valor}
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                    <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
                        <button
                            onClick={aplicarFiltros}
                            style={{
                                padding: "0.5rem 1rem",
                                backgroundColor: "#28a745",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                        >
                            Aplicar Filtros
                        </button>
                        <button
                            onClick={limpiarFiltros}
                            style={{
                                padding: "0.5rem 1rem",
                                backgroundColor: "#dc3545",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                            }}
                        >
                            Limpiar Filtros
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
