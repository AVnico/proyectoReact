
import React from "react";
import { Fragment } from "react";

export function HeaderG(){
return(
    <Fragment>
         <div class="d-flex justify-content-center bg-primary">
         <nav class="navbar navbar-expand-lg navbar-light bg-primary ">
        <a class="navbar-brand" href="#">CUEVANA20</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a class="nav-link" href="#">Péliculas <span class="sr-only"></span></a>
            </li>
        
            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Generos
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">Acción</a>
                <a class="dropdown-item" href="#">Ciencia Ficción</a>
                <a class="dropdown-item" href="#">Terror</a>
                <a class="dropdown-item" href="#">Animadas</a>
                </div>
            </li>
            
            </ul>
            <form class="form-inline my-2 my-lg-0 ml-2">
            <input class="form-control mr-sm-2" type="search" placeholder="Buscar" aria-label="Search"></input>
            
            </form>
            <button class="btn btn-outline-success my-2 my-sm-0 ml-2" type="submit">Buscar Película</button>
  </div>
</nav>
         </div>
         
    </Fragment>
)}