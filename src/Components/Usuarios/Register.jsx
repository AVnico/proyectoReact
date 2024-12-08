import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Usuarios/reg.css';

export function Register() {
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const [nombreUsuario, setNombreUsuario] = useState("");
    const [contraseña, setContraseña] = useState("");
    const [contraseñaParental, setContraseñaParental] = useState("");
    const [generosSeleccionados, setGenerosSeleccionados] = useState([]);
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

    const handleCheckboxChange = (generoId) => {
        setGenerosSeleccionados((prevState) =>
            prevState.includes(generoId)
                ? prevState.filter((id) => id !== generoId)
                : [...prevState, generoId]
        );
    };

    const handleSubmit = async () => {
        const payload = {
            nombre_usuario: nombreUsuario,
            contraseña: contraseña,
            contrasenaparental: parseInt(contraseñaParental, 10),
            generos: generosSeleccionados,
        };

        try {
            const res = await fetch('http://localhost:5000/api/autenticacion/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                alert('Usuario registrado con éxito');
                navigate(`/peliculas`);
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
            <div className="register d-flex justify-content-center align-items-center">
                <div className="card p-4" style={{ width: '400px', maxWidth: '100%' }}>
                    <div className="card-body">
                        <h1 className="text-center mb-4">Registro</h1>
                        <div className="form-group mb-2">
                            <label>Nombre de Usuario</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre de Usuario"
                                value={nombreUsuario}
                                onChange={(e) => setNombreUsuario(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group ">
                            <label>Contraseña</label>
                            <div className="input-group">
                                <input
                                    type={showPass ? "text" : "password"}
                                    className="form-control"
                                    placeholder="Contraseña"
                                    value={contraseña}
                                    onChange={(e) => setContraseña(e.target.value)}
                                    required
                                />
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                >
                                    {showPass ? "Ocultar" : "Mostrar"}
                                </button>
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label>Contraseña Parental (Números)</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Contraseña Parental"
                                value={contraseñaParental}
                                onChange={(e) => setContraseñaParental(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group ">
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
                        <button className="btn btn-primary w-100 mt-3" onClick={handleSubmit}>
                            Registrarse
                        </button>
                        <button className="btn btn-danger w-100 mt-2" onClick={() => navigate('/login')}>
                            Salir
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
