import React from "react";
import { Fragment } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "./Components/Usuarios/Login";
import { Lista } from "./Components/vistaPrincipal/Lista";
import { ListSeries } from "./Components/vistaPrincipal/ListSeries";
import { ListEstrenos } from "./Components/vistaPrincipal/ListEstrenos";
import { VistaPrincipal } from "./Components/vistaPrincipal/VistaPrincipal";
import { VistaIndPel } from "./Components/vistaIndividual/VistaIndPel";
import { Register } from "./Components/Usuarios/Register";

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
                <Route path="*" element={<Login />} />
            </Routes>
        </Fragment>
    );
}
