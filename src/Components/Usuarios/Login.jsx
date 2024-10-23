import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../a.css';

export function Login() {
    const navigate = useNavigate();
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
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
            console.log('Token recibido:', data.token);
            localStorage.setItem('token', data.token);
            localStorage.setItem('usuario_id', data.usuario_id);
            navigate("/peliculas");
        } else {
            console.log('Error:', data.error);
        }
    };
    const goToRegister = () => {
        navigate("/register");
    };

    return (
        <Fragment>
            <div className="login d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                <div className="container text-center">
                    <header><h1 className="text-light">Bienvenido a CUEVANA</h1></header>
                    <h3 className="text-light mt-4" style={{ padding: 20 }}>Por favor, inicie sesión</h3>
                    <div className="row justify-content-center" style={{ padding: 10 }}>
                        <div className="col-auto">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre de usuario"
                                aria-label="Username"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center" style={{ padding: 10 }}>
                        <div className="col-auto">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                aria-label="Password"
                                value={contraseña}
                                onChange={(e) => setContraseña(e.target.value)}
                            />
                        </div>
                    </div>
                    <button className="btn btn-primary mt-3" onClick={handleLogin}>Iniciar sesión</button>
                    <div className="mt-3">
                        <button className="btn btn-success" onClick={goToRegister}>Registrarse</button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}