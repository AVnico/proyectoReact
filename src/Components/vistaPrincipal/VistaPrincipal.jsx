import React from "react";
import { Fragment } from "react";
import { HeaderG } from "../Busqueda/HeaderG";
import { Caruselhome } from "./CaruselHome";
import { Calendario } from "../Busqueda/Calendario";
import { ListGeneros } from "../Busqueda/ListGeneros";
import '../../a.css'

export function VistaPrincipal() {

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
                                <ListGeneros />
                            </div>
                        </div>
                        <div className="col">  
                            <Caruselhome />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
