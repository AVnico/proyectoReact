import React from "react";
import { Fragment } from "react";
import { Route,Routes,useNavigate } from "react-router-dom";
import { Login } from "./Components/Usuarios/Login";
import { Lista } from "./Components/visualPeliculas/Lista";
export function App(){

    const navigate = useNavigate();

    return(
    <Fragment>
        <Routes>
            <Route path="/peliculas" element={<Lista/>} />
            <Route path="*" element={<Login/>} />
        </Routes>
    </Fragment>);
}