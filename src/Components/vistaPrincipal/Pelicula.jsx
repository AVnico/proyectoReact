import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";

export function Pelicula({ pelicula }) {
    const navigate = useNavigate();

    return (
        <Fragment>
            <div className="card text-center text-white" style={{ backgroundColor: 'transparent', border: 'none' }}>
                {/* Imagen de la película */}
                <img 
                    className="card-img-top" 
                    src={pelicula.imagen_url} 
                    alt={pelicula.nombre}
                    style={{
                        width: '400px',        
                        height: '300px',       
                        objectFit: 'cover',    
                        borderRadius: '8px',   
                        marginBottom: '10px'  
                    }} 
                />
                
                <a className="text-center"
                    href="#" 
                    onClick={(e) => {
                        e.preventDefault(); // Evita que se recargue la página
                        navigate(`/pelicula/${pelicula.id}`); // Navega a la página de la película
                    }}
                    style={{ 
                        cursor: 'pointer', 
                        textDecoration: 'none', 
                        color: 'black', 
                        fontWeight: 'bold', 
                        fontSize: '18px', 
                        margin: '10px 0' 
                    }}
                >
                    {pelicula.nombre}
                </a>
            </div>
        </Fragment>
    );
}
