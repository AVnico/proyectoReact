import React from "react";
import { Fragment } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "./Components/Usuarios/Login";
import { Lista } from "./Components/vistaPrincipal/Lista";
import { VistaPrincipal } from "./Components/vistaPrincipal/VistaPrincipal";
import { VistaIndPel } from "./Components/vistaIndividual/VistaIndPel";

export function App() {
    return (
        <Fragment>
            <Routes>
                <Route path="/peliculas" element={<Lista />} />
                <Route path="/home" element={<VistaPrincipal />} />
                {/* Ruta dinámica para la película con un ID */}
                <Route path="/pelicula/:id" element={<VistaIndPel />} />
                <Route path="*" element={<Login />} />
            </Routes>
        </Fragment>
    );
}
