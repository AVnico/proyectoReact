import React from "react";
import { Fragment } from "react";
import { HeaderG } from "../Busqueda/HeaderG";
import { Caruselhome } from "./CaruselHome";


export function VistaPrincipal(){

    return(
        <Fragment>
            <div style={appStyle}>
            <HeaderG></HeaderG>
            <Caruselhome></Caruselhome>
            </div>
            
        </Fragment>
    )
}
const appStyle = {
    backgroundImage: `url('/fondo.jpg')`, 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh', 
};