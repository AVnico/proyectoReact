import React from "react";
import { Fragment } from "react";
import { HeaderG } from "../Busqueda/HeaderG";
import { Calendario } from "../Busqueda/Calendario";
import { ListGeneros } from "../Busqueda/ListGeneros";
import { PelIndividual } from "./PelIndividual";
import { Comentarios } from "./Comentarios";

export function VistaIndPel() {
    return (
        <Fragment>
            <div className="vista">
                <div className="container-fluid">
                    <HeaderG />
                    <div className="row "> 
                        <div className="col-2"> 
                            <div className="sidebar mt-3 " >
                                
                                <Calendario />
                                <ListGeneros />
                            </div>
                        </div>
                        <div className="col mt-4"> 
                            <PelIndividual />
                        </div>
                        <div class="col-2 "> <Comentarios></Comentarios></div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
