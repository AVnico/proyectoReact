import React from "react";
import { Fragment } from "react";

export function Caruselhome() {
    return (
        <Fragment>
            <h1 className="text-center">Estrenos Recientes</h1>
            <div className="carousel-container" style={carouselContainerStyle}>
                <div id="carouselExampleCaptions" className="carousel slide"> 
                    <div className="carousel-indicators"> 
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button> 
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner"> 
                        <div className="carousel-item active"> 
                            <img src="mufasa.jpg" className="d-block w-100" alt="..." /> 
                            <div className="carousel-caption d-none d-md-block"> 
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img src="deadpol.jpg" className="d-block w-100" alt="..." /> 
                            <div className="carousel-caption d-none d-md-block"> 
                            </div>
                        </div>
                        <div className="carousel-item"> 
                            <img src="mufasa.jpg" className="d-block w-100" alt="..." /> 
                            <div className="carousel-caption d-none d-md-block"> 
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev"> 
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next"> 
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </Fragment>
    );
}

const carouselContainerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(5px)',
};
