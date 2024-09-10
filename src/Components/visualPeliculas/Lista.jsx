import React from "react";
import { Fragment } from "react";

import { Pelicula } from "./Pelicula";

export function Lista(){
    return (
        <Fragment>
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
        </Fragment>
    )
}