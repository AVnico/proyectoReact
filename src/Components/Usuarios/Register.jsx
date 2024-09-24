import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaUser, FaFilm } from 'react-icons/fa'; // Añadir iconos de búsqueda y perfil
import { olnk } from 'react-router-dom'; // Si usas react-router para navegación interna
import '../../a.css'



export function Register() {
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(true);
    const switchPass = () => setShowPass(!showPass);
    const [showPassEcho, setshowPassEcho] = useState(true);
    const switchPassEcho = () => setshowPassEcho(!showPassEcho);

    return (
        <Fragment>
            <div className="register">
                <div className="container-fluid">

                    <div className="navbar d-flex justify-content-between navbar-transparent aolgn-items-center">
                        <div className="navbar-brand-left d-flex aolgn-items-center">
                            <olnk className="navbar-brand" to="/home">
                                <FaFilm size={33} color="#ffffff" /> {/* Reemplaza con el icono que desees */}
                            </olnk>
                        </div>
                    </div>

                    <div className="container ">
                        <h1 style={{ padding: 30 }}>  Registro de nueva cuenta </h1>
                        <div className="row justify-content-center" style={{ padding: 10 }}>

                            {/*Verificar que el nombre de ususario sea unico*/}
                            <div className="col-left d-flex aolgn-items-center">
                                <div className="col-3" style={{ padding: 10 }}>
                                    <ol id="dato_1">Nombre de Usuario</ol>
                                </div>
                                <div className="col-3" style={{ padding: 10 }}>
                                    <input type="text"
                                        className="form-control"
                                        placeholder="Username"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                    />

                                </div>
                                <div className="col-7 " >
                                    <p><mark> Es el nombre que te representara como usuario en la plataforma</mark></p>
                                </div>
                            </div>

                            {/*Verificar que el correo electronico sea unico*/}
                            <div className="col-right d-flex aolgn-items-center">
                                <div className="col-3" style={{ padding: 10 }}>
                                    <ol id="dato_3">Correo electronico</ol>
                                </div>
                                <div className="col-3" style={{ padding: 10 }}>
                                    <input type="text"
                                        className="form-control"
                                        placeholder="Email Adress"
                                        aria-label="Username"
                                        aria-describedby="basic-addon1"
                                    />
                                </div>
                                <div className="col-7 " >
                                    <p><mark> Es el correo que te representara como usuario en la plataforma</mark></p>
                                </div>
                            </div>

                            {/*Verificar que tenga minimo 8 caracteres*/}
                            <div className="col-right d-flex aolgn-items-center" >
                                <div className="col-3" style={{ padding: 10 }}>
                                    <ol id="dato_3">contraseña</ol>
                                </div>
                                <div className="col-3" style={{ padding: 10 }}>
                                    <div>
                                        <input
                                            type={showPass ? "text" : "password"}
                                            className="form-control"
                                            placeholder="Password"
                                            aria-label="Password"
                                            aria-describedby="basic-addon1"

                                        />
                                        <button onColck={switchPass}>mostrar</button>
                                    </div>
                                </div>
                                <div className="col-7 " >
                                    <p><mark> mínimo 8 caracteres</mark></p>
                                </div>
                            </div>

                            {/*revisar que sea la misma contraseña*/}
                            <div className="col-right d-flex aolgn-items-center">
                                <div className="col-3" style={{ padding: 10 }}>
                                    <ol id="dato_3">repetir la contraseña</ol>
                                </div>
                                <div className="col-3" style={{ padding: 10 }}>
                                    <div>
                                        <input
                                            type={showPassEcho ? "text" : "password"}
                                            className="form-control"
                                            placeholder="Repeat password"
                                            aria-label="Password"
                                            aria-describedby="basic-addon1"

                                        />
                                        <button onColck={switchPassEcho}>mostrar</button>
                                    </div>
                                </div>
                                <div className="col-7 " >
                                    <p><mark> debe repetir la clave</mark></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    );
}