import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Usuarios/log.css';
import { FaUser, FaLock } from 'react-icons/fa';

export function Login() {
    const navigate = useNavigate();
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        const res = await fetch('http://localhost:5000/api/autenticacion/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre_usuario: correo,
                contraseña: contraseña,
            }),
        });
        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('usuario_id', data.usuario_id);
            navigate("/peliculas");
        } else {
            setError(data.error || 'Error al iniciar sesión. Inténtalo de nuevo.');
        }
    };

    const goToRegister = () => {
        navigate("/register");
    };

    return (
        <Fragment>
            <div className="login-page">
                <div className="login-container">
                    <h2 className="login-title">Bienvenido a CUEVANA</h2>
                    <p className="login-subtitle">Tu portal de películas</p>

                    {error && <div className="error-message">{error}</div>}

                    <div className="input-group">
                        <span className="input-icon"><FaUser /></span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre de usuario"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </div>

                    <div className="input-group">
                        <span className="input-icon"><FaLock /></span>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Contraseña"
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)}
                        />
                    </div>

                    <button className="login-button" onClick={handleLogin}>Iniciar sesión</button>
                    <button className="register-button" onClick={goToRegister}>Registrarse</button>
                </div>
            </div>
        </Fragment>
    );
}
