import React from "react";
import { Fragment } from "react";
import { Route,Routes,useNavigate } from "react-router-dom";
import { Login } from "./Components/Usuarios/Login";
import { Lista } from "./Components/vistaPrincipal/Lista";
import { VistaPrincipal } from "./Components/vistaPrincipal/VistaPrincipal";
import { PelIndividual } from "./Components/vistaIndividual/PelIndividual";

export function App(){

    const navigate = useNavigate();

    return(
    <Fragment>
        <Routes>
            <Route path="/peliculas" element={<Lista/>} />
            <Route path="/home" element={<VistaPrincipal/>} />
            <Route path="/pelicula" element={<PelIndividual/>} />
            <Route path="*" element={<Login/>} />
        </Routes>
    </Fragment>);
}