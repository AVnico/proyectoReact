
import React from "react";
import { Fragment } from "react";

export function HeaderG(){
return(
    <Fragment>
        <div className="navbar d-flex justify-content-center navbar-transparent">
            <nav className="navbar navbar-expand-lg navbar-light navbar-transparent">
            <a className="navbar-brand" href="/home">CUEVANA20</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="/peliculas">Películas <span className="sr-only"></span></a>
                </li>

                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Géneros
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <a className="dropdown-item" href="#">Acción</a>
                    <a className="dropdown-item" href="#">Ciencia Ficción</a>
                    <a className="dropdown-item" href="#">Terror</a>
                    <a className="dropdown-item" href="#">Animadas</a>
                    </div>
                </li>
                </ul>
                <form className="form-inline my-2 my-lg-0 ml-2">
                <input className="form-control mr-sm-2 ml-4" type="search" placeholder="Buscar" aria-label="Search" />
                </form>
                <button className="btn btn-outline-success my-2 my-sm-0 ml-2" type="submit">Buscar Película</button>
            </div>
            </nav>
        </div>
</Fragment>
)}