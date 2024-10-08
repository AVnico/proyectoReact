// routes/peliculas.js
const express = require('express');
const router = express.Router();
const pool = require('../database');

// Endpoint para obtener todas las películas
router.get('/', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM peliculas');
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las películas" });
    }
});

// Endpoint para obtener una película por su ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query(`
            SELECT p.*, g.nombre AS genero_nombre 
            FROM peliculas p
            LEFT JOIN generos g ON p.genero_id = g.id
            WHERE p.id = ?`, [id]);
        if (result.length === 0) {
            return res.status(404).json({ message: "Película no encontrada" });
        }
        res.json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener la película" });
    }
});

router.get('/genero/:genero', async (req, res) => {
    try {
        const { genero } = req.params;
        const [result] = await pool.query(`
            SELECT p.*, g.nombre AS genero_nombre 
            FROM peliculas p
            LEFT JOIN generos g ON p.genero_id = g.id
            WHERE g.nombre = ?`, [genero]);
        if (result.length === 0) {
            return res.status(404).json({ message: "No se encontraron películas para este género" });
        }
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las películas por género" });
    }
});

router.get('/recomendaciones/:id', async (req, res) => {
    const { id } = req.params; // El id del usuario viene de los parámetros

    try {
        // Obtener los géneros favoritos del usuario
        const [generosUsuario] = await db.query(`
            SELECT genero_id FROM usuarios_generos WHERE usuario_id = ?
        `, [id]);

        if (generosUsuario.length === 0) {
            return res.status(404).json({ message: 'El usuario no tiene géneros favoritos' });
        }

        // Extraer los ids de los géneros favoritos
        const generoIds = generosUsuario.map(g => g.genero_id);

        // Buscar las películas que coincidan con esos géneros
        const query = `
            SELECT p.* 
            FROM peliculas p 
            WHERE p.genero_id IN (?)
        `;

        const [peliculasRecomendadas] = await db.query(query, [generoIds]);

        // Devolver las películas encontradas
        res.json(peliculasRecomendadas);
    } catch (error) {
        console.error('Error al obtener recomendaciones:', error);
        res.status(500).json({ message: 'Error al obtener recomendaciones' });
    }
});

  

router.get('/buscar/:nombre', async (req, res) => {
    try {
        const { nombre } = req.params;
        const [result] = await pool.query(`
            SELECT p.*, g.nombre AS genero_nombre 
            FROM peliculas p
            LEFT JOIN generos g ON p.genero_id = g.id
            WHERE p.nombre LIKE ?`, [`%${nombre}%`]);

        if (result.length === 0) {
            return res.status(404).json({ message: "No se encontraron películas con ese nombre" });
        }
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al buscar las películas por nombre" });
    }
});
module.exports = router;