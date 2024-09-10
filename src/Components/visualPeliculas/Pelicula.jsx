import React from "react";
import { Fragment } from "react";

export function Pelicula(){
    return (
        <Fragment>
        <div class="card text-center mb-5" >
            <h2>Nombre Película</h2>
            <img class="card-img-top" src="https://www.themoviedb.org/t/p/original/eKTvmApQkxKmgBby223P61m9QYS.jpg" alt="Card image cap"></img>
            <div class="card-body">
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <button type="button" class="btn btn-success">Ver</button>
        </div>     
        </Fragment>
    )}

