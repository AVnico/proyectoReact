// routes/series.js
const express = require('express');
const router = express.Router();
const pool = require('../database');

// Endpoint para obtener todas las series
router.get('/', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM series');
        res.json(result);  // Devolver los datos como JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las series" });
    }
});

// Endpoint para obtener una serie por su ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query(`
            SELECT p.*, g.nombre AS genero_nombre 
            FROM series p
            LEFT JOIN generos g ON p.genero_id = g.id
            WHERE p.id = ?`, [id]);
        
        if (result.length === 0) {
            return res.status(404).json({ message: "Serie no encontrada" });
        }
        res.json(result[0]);  // Devolver los datos de la serie como JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener la serie" });
    }
});

// Endpoint para obtener series por género
router.get('/genero/:genero', async (req, res) => {
    try {
        const { genero } = req.params;
        const [result] = await pool.query(`
            SELECT p.*, g.nombre AS genero_nombre 
            FROM series p
            LEFT JOIN generos g ON p.genero_id = g.id
            WHERE g.nombre = ?`, [genero]);
        
        if (result.length === 0) {
            return res.status(404).json({ message: "No se encontraron series para este género" });
        }
        res.json(result);  // Devolver las series del género como JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las series por género" });
    }
});


module.exports = router;
