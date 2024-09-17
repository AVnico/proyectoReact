import React from "react";
import { Fragment } from "react";

export function PelIndividual(){

    return (
        <Fragment>
            <div className="">
                <article class = "info" itemScope itemType=""> 
                <figure class="poster">
                    <img itemprop="image"src="shadow.jpg"alt="post"  loading="lazy"></img>
                </figure>
                <header class ="info-header"><h1>Sonic 3 </h1></header>
                <footer class="info-foter">
                    <p class = "meta">
                        <span>1h 30m </span>
                        <span> - </span>
                        <span>2024</span>
                    </p>

                </footer>

                
                </article>
            </div>
        </Fragment>
    )
}