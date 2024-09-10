import React from "react";

import { Route,Routes,useNavigate } from "react-router-dom";

import { Fragment } from "react";
import { HeaderG } from "./Components/Busqueda/HeaderG";
import { Lista } from "./Components/visualPeliculas/Lista";
import {Login } from "./Components/Usuarios/Login";
export function App(){

    const navigate = useNavigate();

    return(
    <Fragment>
        

        <Routes>

        <Route path="*" element={<Login />} />

        </Routes>
    </Fragment>);
}