import React, { Fragment, useState } from "react";
import '../../a.css';

export function Comentarios() {
    const [valoracion, setValoracion] = useState('');
    const [comentario, setComentario] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log(`Valoración: ${valoracion}, Comentario: ${comentario}`);
    
        setValoracion('');
        setComentario('');
    };

    return (
        <Fragment>
           <div className="coment">
           <h1>Valoraciones</h1>
           <div className="container-fluid mt-1">
                <div className="row">
                    <div className="col-1"></div>
                    <div className="col">
                        {/* Comentarios existentes */}
                        <div className="row mb-4">
                            <h4>Nombre usuario</h4>
                            <h5>Valoración: Excelente</h5>
                            <p>Este es un comentario de ejemplo.</p>
                        </div>

                        {/* Caja de comentario nueva */}
                        <div className="row">
                            <form onSubmit={handleSubmit} className="w-100">
                                <div className="form-group">
                                    <label htmlFor="valoracion">Valoración</label>
                                    <select
                                        className="form-control"
                                        id="valoracion"
                                        value={valoracion}
                                        onChange={(e) => setValoracion(e.target.value)}
                                        required
                                    >
                                        <option value="">Selecciona una valoración</option>
                                        <option value="Excelente">Excelente</option>
                                        <option value="Buena">Buena</option>
                                        <option value="Regular">Regular</option>
                                        <option value="Mala">Mala</option>
                                        <option value="Muy Mala">Muy Mala</option>
                                    </select>
                                </div>

                                <div className="form-group mt-3">
                                    <label htmlFor="comentario">Escribe tu comentario</label>
                                    <textarea
                                        className="form-control"
                                        id="comentario"
                                        rows="4"
                                        value={comentario}
                                        onChange={(e) => setComentario(e.target.value)}
                                        required
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-primary mt-3">
                                    Comentar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
           </div>
        </Fragment>
    );
}
