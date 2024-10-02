import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import '../../comentarios.css';

export function Comentarios() {
    const { id } = useParams();
    const [valoracion, setValoracion] = useState('');
    const [comentario, setComentario] = useState('');
    const [comentarios, setComentarios] = useState([]);
    const usuario_id = localStorage.getItem('usuario_id');
    useEffect(() => {
        fetch(`http://localhost:5000/api/comentarios/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Error al obtener comentarios');
                }
                return res.json();
            })
            .then(data => setComentarios(data))
            .catch(error => console.error('Error al obtener comentarios:', error));
    }, [id]);
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:5000/api/comentarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                usuario_id: usuario_id,
                pelicula_id: id,
                valoracion: valoracion,
                descripcion: comentario
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Error en el servidor');
                }
                return res.json();
            })
            .then(data => {
                console.log('Comentario enviado:', data);
                setComentarios(prevComentarios => [
                    ...prevComentarios,
                    {
                        nombre_usuario: 'Tú',
                        valoracion: valoracion,
                        descripcion: comentario
                    }
                ]);
                setValoracion('');
                setComentario('');
            })
            .catch(error => console.error('Error al enviar comentario:', error));
    };

    return (
        <Fragment>
            <div className="coment">
                <h1 className="text-center">Valoraciones</h1>
                <div className="container-fluid mt-3">
                    <div className="row">
                        <div className="col">
                            <div className="comentarios-container">
                                {comentarios.length > 0 ? (
                                    comentarios.map((comentario, index) => (
                                        <div key={index} className="row mb-4 p-3 border rounded shadow-sm bg-light">
                                            <h4>{comentario.nombre_usuario}</h4>
                                            <h5 className="text-muted">Valoración: {comentario.valoracion}/10</h5>
                                            <p>{comentario.descripcion}</p>
                                        </div>
                                    ))
                                ) : (<p>No hay comentarios aún.</p>
                                )}
                            </div>
                            <div className="row mt-4">
                                <form onSubmit={handleSubmit} className="w-100">
                                    <div className="form-group">
                                        <label htmlFor="valoracion">Valoración (1-10)</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="valoracion"
                                            value={valoracion}
                                            onChange={(e) => setValoracion(e.target.value)}
                                            min="1"
                                            max="10"
                                            required
                                        />
                                    </div>
                                    <div className="form-group mt-3">
                                        <label htmlFor="comentario">Escribe tu comentario</label>
                                        <textarea
                                            className="form-control"
                                            id="comentario"
                                            rows="4"
                                            value={comentario}
                                            onChange={(e) => setComentario(e.target.value)}
                                            required>
                                        </textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary mt-3">Comentar
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