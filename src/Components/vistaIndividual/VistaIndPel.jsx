import React from "react";
import { Fragment } from "react";
import { HeaderG } from "../Busqueda/HeaderG";
import { Calendario } from "../Busqueda/Calendario";
import { ListGeneros } from "../Busqueda/ListGeneros";
import { PelIndividual } from "./PelIndividual";

export function VistaIndPel(){

    return(
        <Fragment>
             <div className="vista">
            <div className="container-fluid">
            <HeaderG></HeaderG>
                <div class="row">
                    <div class="col-2"> 
                        <div className="sidebar">
                        <h2 className="text-center">Nuevos Estrenos</h2>
                        <Calendario></Calendario>
                        <ListGeneros></ListGeneros>
                        </div>
                    </div>
                    <div class="col">
                        <PelIndividual></PelIndividual>
                    </div>
                </div>
            </div>
            </div>
        </Fragment>
    )
}