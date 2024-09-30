import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFilm } from 'react-icons/fa'; // Icono de película
import '../../a.css';

export function Register() {
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const switchPass = () => setShowPass(!showPass);

    // Datos del formulario
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [generosSeleccionados, setGenerosSeleccionados] = useState([]);

    // Lista de géneros
    const genres = [
        { id: 1, nombre: 'Acción' },
        { id: 2, nombre: 'Animación' },
        { id: 3, nombre: 'Anime' },
        { id: 4, nombre: 'Aventura' },
        { id: 5, nombre: 'Drama' },
        { id: 6, nombre: 'Ciencia Ficción' },
        { id: 7, nombre: 'Comedia' },
        { id: 8, nombre: 'Fantasía' },
    ];

    // Manejar cambios en los checkboxes de géneros
    const handleCheckboxChange = (generoId) => {
        setGenerosSeleccionados((prevState) =>
            prevState.includes(generoId)
                ? prevState.filter((id) => id !== generoId)
                : [...prevState, generoId]
        );
    };

    // Enviar datos al backend
    const handleSubmit = async () => {
        const payload = {
            nombre_usuario: nombreUsuario,
            contraseña: contraseña,
            generos: generosSeleccionados, // Generos seleccionados
        };

        try {
            const res = await fetch('http://localhost:5000/api/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                alert('Usuario registrado con éxito');
                navigate(`/home`);
            } else {
                const data = await res.json();
                alert(data.error);
            }
        } catch (error) {
            console.error('Error al registrar el usuario:', error);
            alert('Error al registrar el usuario');
        }
    };

    return (
        <Fragment>
            <div className="register d-flex justify-content-center align-items-center" >
                <div className="card p-4" style={{ width: '400px', maxWidth: '100%' }}>
                    <div className="card-body">
                        <h1 className="text-center mb-4">Registro</h1>

                        {/* Nombre de usuario */}
                        <div className="form-group mb-2">
                            <label htmlFor="username">Nombre de Usuario</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Nombre de Usuario"
                                value={nombreUsuario}
                                onChange={(e) => setNombreUsuario(e.target.value)}
                                required
                            />
                        </div>

                        {/* Contraseña */}
                        <div className="form-group mb-2">
                            <label htmlFor="password">Contraseña</label>
                            <div className="input-group">
                                <input
                                    type={showPass ? "text" : "password"}
                                    className="form-control"
                                    id="password"
                                    placeholder="Contraseña"
                                    value={contraseña}
                                    onChange={(e) => setContraseña(e.target.value)}
                                    required
                                />
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={switchPass}
                                >
                                    {showPass ? "Ocultar" : "Mostrar"}
                                </button>
                            </div>
                        </div>

                        {/* Géneros favoritos */}
                        <div className="form-group mb-2">
                            <label>Géneros favoritos</label>
                            <div className="d-flex flex-wrap">
                                {genres.map((genre, index) => (
                                    <div className="form-check me-3" key={genre.id}>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`genre-${index}`}
                                            checked={generosSeleccionados.includes(genre.id)}
                                            onChange={() => handleCheckboxChange(genre.id)}
                                        />
                                        <label className="form-check-label" htmlFor={`genre-${index}`}>
                                            {genre.nombre}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Botón de registro */}
                        <button
                            className="btn btn-primary w-100 mt-3"
                            onClick={handleSubmit}
                        >
                            Registrarse
                        </button>
                        <div><button className="btn btn-danger w-100 mt-2" onClick={() => navigate('/login')}>Salir</button></div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
