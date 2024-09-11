import React from "react";
import { Fragment } from "react";

import { Pelicula } from "./Pelicula";
import { HeaderG } from "../Busqueda/HeaderG";

export function Lista(){
    return (
        <Fragment>
            <div style={appStyle}>
            <HeaderG></HeaderG>
            <div class="container">
                <div class="row">
                    <div class="col"><Pelicula></Pelicula></div>
                    <div class="col"><Pelicula></Pelicula></div>
                    <div class="col"><Pelicula></Pelicula></div>
                    <div class="col"><Pelicula></Pelicula></div>
                </div>
                <div class="row">
                    <div class="col"><Pelicula></Pelicula></div>
                    <div class="col"><Pelicula></Pelicula></div>
                    <div class="col"><Pelicula></Pelicula></div>
                    <div class="col"><Pelicula></Pelicula></div>
                </div>
            </div> 
                
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