import React from "react";
import { Fragment } from "react";
import { HeaderG } from "../Busqueda/HeaderG";
import { Caruselhome } from "./CaruselHome";
import '../../a.css'

export function VistaPrincipal(){

    return(
        <Fragment>
            
            <div className="vista">
            <div className="container-fluid">
            <HeaderG></HeaderG>
                <div class="row">
                    <div class="col-2"> 
                        <h2>Calendario</h2>
                    </div>
                    <div class="col">
                    <Caruselhome></Caruselhome>
            
                    </div>
                </div>
            </div>
            </div>
            
          
        </Fragment>
    )
}
