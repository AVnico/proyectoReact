import React, { useState, Fragment } from "react";
import '../../a.css'; 
import { useNavigate } from "react-router-dom";

export function PanelUsuario() {
    const [nombre, setNombre] = useState("Usuario Actual"); // Nombre actual del usuario
    const [contraseña, setContraseña] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [generos, setGeneros] = useState({
        Accion: false,
        Animacion: false,
        Anime: false,
        Aventura: false,
        Drama: false,
        CienciaFiccion: false,
        Comedia: false,
        Fantasia: false,
    });

    const togglePassword = () => setShowPass(!showPass);

    const handleGeneroChange = (genero) => {
        setGeneros({ ...generos, [genero]: !generos[genero] });
    };

    const handleSaveChanges = () => {

        console.log("Nombre:", nombre);
        console.log("Contraseña:", contraseña);
        console.log("Géneros favoritos:", generos);
        alert("Cambios guardados exitosamente");
    };
    const navigate = useNavigate();
    return (
        <Fragment>
            <div className="user-panel d-flex justify-content-center align-items-center ">
                <div className="card p-4" style={{ width: '400px', maxWidth: '100%' }}>
                    <div className="card-body">
                        <h1 className="text-center ">Editar Perfil</h1>

                        {/* Nombre de usuario */}
                        <div className="form-group mb-2">
                            <label htmlFor="username">Nombre de Usuario</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>

                        {/* Contraseña */}
                        <div className="form-group mb-2">
                            <label htmlFor="password">Nueva Contraseña</label>
                            <div className="input-group">
                                <input
                                    type={showPass ? "text" : "password"}
                                    className="form-control"
                                    id="password"
                                    value={contraseña}
                                    onChange={(e) => setContraseña(e.target.value)}
                                />
                                <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={togglePassword}
                                >
                                    {showPass ? "Ocultar" : "Mostrar"}
                                </button>
                            </div>
                        </div>

                        {/* Géneros favoritos */}
                        <div className="form-group mb-3">
                            <label>Géneros favoritos</label>
                            <div className="d-flex flex-wrap">
                                {Object.keys(generos).map((genero, index) => (
                                    <div className="form-check me-3" key={index}>
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            id={`genero-${genero}`}
                                            checked={generos[genero]}
                                            onChange={() => handleGeneroChange(genero)}
                                        />
                                        <label className="form-check-label" htmlFor={`genero-${genero}`}>
                                            {genero}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Botón de guardar cambios */}
                        <button className="btn btn-primary w-100 mt-3" onClick={handleSaveChanges}>
                            Guardar Cambios
                        </button>
                        <div><button className="btn btn-danger w-100 mt-2" onClick={() => navigate('/peliculas')}>Salir</button></div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
