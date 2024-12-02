import React from "react";
import { Fragment } from "react";
import { HeaderG } from "../Busqueda/HeaderG";
import { SerIndividual } from "./SerIndividual";
import { Comentarios } from "./Comentarios";

export function VistaIndSer() {
    return (
        <Fragment>
            <div className="vista">
                <div className="container-fluid">
                    <HeaderG />
                    <div className="row ">
                    
                        <div className="col mt-4">
                        <SerIndividual />
                        </div>
                        <div class="col-2 "> <Comentarios></Comentarios></div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
