import React, { useState, useEffect } from "react";
import '../../a.css'; 
import { useNavigate } from "react-router-dom";

export function PanelUsuario() {
    const [nombre, setNombre] = useState(""); 
    const [contraseña, setContraseña] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [generos, setGeneros] = useState({});
    const [todosLosGeneros, setTodosLosGeneros] = useState([]);
    const [usuarioId, setUsuarioId] = useState(null); 
    const [mensajeExito, setMensajeExito] = useState(""); // Nuevo estado para el mensaje de éxito
    const navigate = useNavigate();

    useEffect(() => {
        const obtenerPerfil = async () => {
            const usuarioId = localStorage.getItem('usuario_id'); 
            if (!usuarioId) {
                console.error('No se encontró el ID del usuario en el localStorage.');
                return;
            }
            setUsuarioId(usuarioId);
            try {
                const response = await fetch(`http://localhost:5000/api/perfil/${usuarioId}`);
                if (!response.ok) {
                    throw new Error(`Error en la respuesta del servidor: ${response.statusText}`);
                }
                const data = await response.json();
                setNombre(data.nombre_usuario);
                const generosSeleccionados = data.generos.reduce((acc, genero) => {
                    acc[genero.nombre] = true;
                    return acc;
                }, {});
                setGeneros(generosSeleccionados);
            } catch (error) {
                console.error('Error al obtener el perfil del usuario:', error);
            }
        };

        obtenerPerfil();
    }, []);

    // Obtener todos los géneros disponibles
    useEffect(() => {
        const obtenerGeneros = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/generos');
                if (!response.ok) {
                    throw new Error(`Error en la respuesta del servidor: ${response.statusText}`);
                }
                const data = await response.json();
                setTodosLosGeneros(data);
            } catch (error) {
                console.error('Error al obtener los géneros:', error);
            }
        };

        obtenerGeneros();
    }, []);

    const togglePassword = () => setShowPass(!showPass);

    const handleGeneroChange = (genero) => {
        setGeneros({ ...generos, [genero]: !generos[genero] });
    };

    const handleSaveChanges = async () => {
        const usuarioId = localStorage.getItem('usuario_id');
        
        const datosActualizados = {
            nombre_usuario: nombre,
            contraseña: contraseña,
        };
    
        try {
            const response = await fetch(`http://localhost:5000/api/autenticacion/perfil/${usuarioId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosActualizados),
            });

            if (response.ok) {
                console.log('Perfil actualizado con éxito');
                setMensajeExito("Datos actualizados correctamente"); // Mostrar mensaje de éxito
            } else {
                console.error('Error al guardar los cambios:', response.statusText);
                setMensajeExito("Error al actualizar los datos"); // Mostrar mensaje de error
            }
        } catch (error) {
            console.error('Error al guardar los cambios:', error);
            setMensajeExito("Error al actualizar los datos"); // Mostrar mensaje de error
        }
    };

    return (
        <div className="user-panel d-flex justify-content-center align-items-center fluid">
            <div className="card p-4" style={{ width: '400px', maxWidth: '100%' }}>
                <div className="card-body">
                    <h1 className="text-center">Editar Perfil</h1>

                    {/* Mensaje de éxito */}
                    {mensajeExito && (
                        <div className="alert alert-success" role="alert">
                            {mensajeExito}
                        </div>
                    )}

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
                            {todosLosGeneros.map((genero) => (
                                <div className="form-check me-3" key={genero.id}>
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id={`genero-${genero.nombre}`}
                                        checked={generos[genero.nombre] || false}
                                        onChange={() => handleGeneroChange(genero.nombre)}
                                    />
                                    <label className="form-check-label" htmlFor={`genero-${genero.nombre}`}>
                                        {genero.nombre}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Botón de guardar cambios */}
                    <button className="btn btn-primary w-100 mt-3" onClick={handleSaveChanges}>
                        Guardar Cambios
                    </button>
                    <button className="btn btn-danger w-100 mt-2" onClick={() => navigate('/peliculas')}>
                        Salir
                    </button>
                </div>
            </div>
        </div>
    );
}
