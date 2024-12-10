import React, { useState, Fragment } from "react";
import './PanelUsuario.css';

import { useNavigate } from "react-router-dom";

export function PanelUsuario() {
    const [nombre, setNombre] = useState("Usuario Actual2");
    const [contraseña, setContraseña] = useState('');
    const [contrasenaParental, setContrasenaParental] = useState(''); // Nuevo estado para contraseña parental
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
        console.log("Contraseña Parental:", contrasenaParental); // Imprimir la contraseña parental
        console.log("Géneros favoritos:", generos);
        alert("Cambios guardados exitosamente");
    };

    const navigate = useNavigate();

    return (
        <Fragment>
            <div className="user-panel d-flex justify-content-center align-items-center fluid">
                <div className="card p-4" style={{ width: '400px', maxWidth: '100%' }}>
                    <div className="card-body">
                        <h1 className="text-center ">Editar Perfil</h1>
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
                        <div className="form-group mb-2">
                            <label htmlFor="parentalPassword">Contraseña Parental</label>
                            <input
                                type="number"
                                className="form-control"
                                id="parentalPassword"
                                placeholder="Contraseña Parental"
                                value={contrasenaParental}
                                onChange={(e) => setContrasenaParental(e.target.value)}
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Géneros favoritos</label>
                            <div className="row">
                                {Object.keys(generos).map((genero, index) => (
                                    <div className="col-6 form-check" key={index}> {/* Dos columnas */}
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

                        <button
                            className="btn btn-primary w-100 mt-3"
                            onClick={handleSaveChanges}
                        >
                            Guardar Cambios
                        </button>
                        <button
                            className="btn btn-danger w-100 mt-2"
                            onClick={() => navigate('/peliculas')}
                        >
                            Salir
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
