import React from "react";
import { Fragment } from "react";
import { Pelicula } from "./Pelicula";
import { HeaderG } from "../Busqueda/HeaderG";
import '../../a.css'
export function Lista(){
    return (
        <Fragment>
            <div className="vista">
            <div class="container-fluid">
            <HeaderG></HeaderG>
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
