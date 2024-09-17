import React from "react";
import { Fragment } from "react";

export function Pelicula(){
    return (
        <Fragment>
        <div className="card text-center mb-5" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', border: 'none' }}>
          <h2>Nombre Película</h2>
          <img className="card-img-top" src="https://www.themoviedb.org/t/p/original/eKTvmApQkxKmgBby223P61m9QYS.jpg" alt="Card image cap"></img>
          <div className="card-body">
            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
          </div>
          <button className="btn btn-success" onClick="/pelicula">Ver</button>
        </div>     
</Fragment>
    )}

