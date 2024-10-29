import React from "react";
import { Fragment } from "react";
import { HeaderG } from "../Busqueda/HeaderG";
import { Calendario } from "../Busqueda/Calendario";
import { ListGeneros } from "../Busqueda/ListGeneros";
import { SerIndividual } from "./SerIndividual";
import { Comentarios } from "./Comentarios";

export function VistaIndSer() {
    return (
        <Fragment>
            <div className="vista">
                <div className="container-fluid">
                    <HeaderG />
                    <div className="row"> 
                        <div className="col-2"> 
                            <div className="sidebar">
                                <h2 className="text-center">Nuevos Estrenos</h2>
                                <Calendario />
        
                            </div>
                        </div>
                        <div className="col"> 
                            <SerIndividual />
                            <Comentarios/>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
