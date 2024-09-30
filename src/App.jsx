import React from "react";
import { Fragment } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "./Components/Usuarios/Login";
import { Lista } from "./Components/vistaPrincipal/Lista";
import { ListSeries } from "./Components/vistaPrincipal/ListSeries";
import { ListEstrenos } from "./Components/vistaPrincipal/ListEstrenos";
import { VistaPrincipal } from "./Components/vistaPrincipal/VistaPrincipal";
import { VistaIndPel } from "./Components/vistaIndividual/VistaIndPel";
import { VistaIndSer } from "./Components/vistaIndividual/VistaIndSer";
import { Register } from "./Components/Usuarios/Register";
import { PanelUsuario } from "./Components/Usuarios/PanelUsuario";

export function App() {
    return (
        <Fragment>
            <Routes>
                <Route path="/peliculas" element={<Lista />} />
                <Route path="/series" element={<ListSeries />} />
                <Route path="/estrenos" element={<ListEstrenos />} />
                <Route path="/home" element={<VistaPrincipal />} />
                <Route path="/register" element={<Register/>}/>
                {/* Ruta dinámica para la película con un ID */}
                <Route path="/pelicula/:id" element={<VistaIndPel />} />
                {/* Ruta dinámica para generos de peliculas */}
                <Route path="/pelicula/:genero" element={<VistaIndPel />} />
                {/* Ruta dinámica para la serie con un ID */}
                <Route path="/serie/:id" element={<VistaIndSer />} />
                {/* Ruta dinámica para generos de series */}
                <Route path="/serie/:genero" element={<VistaIndSer />} />
                <Route path="*" element={<Login />} />
                <Route path="/user" element={<PanelUsuario />} />
            </Routes>
        </Fragment>
    );
}
