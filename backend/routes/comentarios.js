// routes/comentarios.js
const express = require('express');
const router = express.Router();
const pool = require('../database'); 

// Obtener comentarios de una película específica
router.get('/:pelicula_id', async (req, res) => {
    const { pelicula_id } = req.params;
    try {
        const [comentarios] = await pool.query(`
            SELECT c.valoracion, c.descripcion, u.nombre_usuario
            FROM comentarios c
            JOIN usuarios u ON c.usuario_id = u.id
            WHERE c.pelicula_id = ?`, [pelicula_id]);
        res.json(comentarios);  // Devolver los comentarios como JSON
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Error en el servidor al obtener comentarios' });
    }
});

// Guardar un nuevo comentario
router.post('/', async (req, res) => {
    console.log('Datos recibidos:', req.body); // Muestra los datos recibidos

    const { usuario_id, pelicula_id, valoracion, descripcion } = req.body;

    // Validar que todos los campos estén presentes
    if (!usuario_id || !pelicula_id || valoracion === undefined || !descripcion) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Validar que valoracion esté en el rango correcto
    if (valoracion < 1 || valoracion > 10) {
        return res.status(400).json({ error: 'La valoración debe ser entre 1 y 10.' });
    }

    try {
        await pool.query(`INSERT INTO comentarios (usuario_id, pelicula_id, valoracion, descripcion)
            VALUES (?, ?, ?, ?)`, [usuario_id, pelicula_id, valoracion, descripcion]);
        res.status(201).json({ message: 'Comentario guardado correctamente' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Error en el servidor al guardar el comentario' });
    }
});


module.exports = router;
