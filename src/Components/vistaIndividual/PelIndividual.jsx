import React from "react";
import { Fragment } from "react";

export function PelIndividual() {

    return (
        <Fragment>
            <div className="movie-container justify-content-center text-center mt-4">
                <article className="info" itemScope itemType="https://schema.org/Movie"> 
                    <figure className="poster content-center">
                        <img itemProp="image" src="/shadow.jpg" alt="Sonic 3" loading="lazy" className="poster-image" />
                    </figure>

                    <header className="info-header">
                        <h1 itemProp="name">Sonic 3</h1>
                    </header>

                    <div className="descripción" itemProp="description">
                        <p>
                            Sonic se enfrenta a su mayor desafío en esta emocionante tercera entrega. ¡Una aventura llena de velocidad, acción y amistad!
                        </p>
                    </div>

    
                    <div className="autores">
                        <p><strong>Directores:</strong> <span itemProp="director">John Doe, Jane Doe</span></p>
                        <p><strong>Reparto:</strong> <span itemProp="actor">Actor 1, Actor 2, Actor 3</span></p>
                    </div>

               
                    <footer className="info-footer">
                        <p className="meta">
                            <span itemProp="duration">1h 30m</span>
                            <span> - </span>
                            <span itemProp="datePublished">2024</span>
                        </p>
                    </footer>
                </article>
            </div>
        </Fragment>
    );
}
