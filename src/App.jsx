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
import { Comentarios } from "./Components/vistaIndividual/Comentarios";

export function App() {
    return (
        <Fragment>
            <Routes>
                {/* Rutas para el listado de películas, series y estrenos */}
                <Route path="/peliculas" element={<Lista />} />
                <Route path="/series" element={<ListSeries />} />
                <Route path="/estrenos" element={<ListEstrenos />} />
                <Route path="/home" element={<VistaPrincipal />} />
                <Route path="/register" element={<Register />} />
                
                {/* Ruta dinámica para la película por ID */}
                <Route path="/pelicula/:id" element={<VistaIndPel />} />

                {/* Ruta dinámica para series por ID */}
                <Route path="/serie/:id" element={<VistaIndSer />} />

                {/* Rutas dinámicas para películas filtradas por género */}
                <Route path="/genero/peliculas/:genero" element={<Lista />} />
                
                {/* Rutas dinámicas para series filtradas por género */}
                <Route path="/genero/series/:genero" element={<ListSeries />} />

                {/* Ruta para el panel de comentarios */}
                <Route path="/pelicula/:id/comentarios" element={<Comentarios />} />

                {/* Ruta para el panel del usuario */}
                <Route path="/user" element={<PanelUsuario />} />
                
                {/* Ruta por defecto (404 o redirección) */}
                <Route path="*" element={<Login />} />
            </Routes>
        </Fragment>
    );
}
