// routes/peliculas.js
const express = require('express');
const router = express.Router();
const pool = require('../database');

// Endpoint para obtener todas las películas
router.get('/', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM peliculas');
        res.json(result);  // Devolver los datos como JSON
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
        res.json(result[0]);  // Devolver los datos de la película como JSON
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
            WHERE g.nombre COLLATE utf8_general_ci = ?`, [genero]);

        if (result.length === 0) {
            return res.status(404).json({ message: "No se encontraron películas para este género" });
        }

        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las películas por género" });
    }
});
module.exports = router;
