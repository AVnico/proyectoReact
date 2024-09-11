import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";

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
            // Guardar token en localStorage o manejar redireccionamiento
            localStorage.setItem('token', data.token); // Ejemplo de cómo guardar el token
            navigate("/home"); // Redirigir a la página de inicio
        } else {
            console.log('Error:', data.error);
        }
    };

    return (
        <Fragment>
            <div className=" ">
                <img src="NewLogo.png" className="rounded mx-auto d-block" width={450} height={220} alt="..." />
                <h1 className="text-center" style={{padding:20}}>Por favor, inicie sesión</h1>
                <div className="container text-center " >
                    <div className="row justify-content-center" style={{padding:10}}>
                        <div className="col-auto">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                aria-label="Username"
                                aria-describedby="basic-addon1"
                                value={correo}
                                onChange={(e) => setCorreo(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row justify-content-center" style={{padding:10}}>
                        <div className=" col-auto">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                aria-label="Password"
                                aria-describedby="basic-addon1"
                                value={contraseña}
                                onChange={(e) => setContraseña(e.target.value)}
                            />
                        </div>
                    </div>
                    <button className="btn btn-primary" onClick={handleLogin}>Iniciar sesión</button>
                </div>
            </div>
        </Fragment>
    );
}
