// routes/estrenos.js
const express = require('express');
const router = express.Router();
const pool = require('../database');

// Endpoint para obtener todas las estrenos
router.get('/', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM estrenos');
        res.json(result);  // Devolver los datos como JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las estrenos" });
    }
});

// Endpoint para obtener una estreno por su ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query(`
            SELECT p.*, g.nombre AS genero_nombre 
            FROM estrenos p
            LEFT JOIN generos g ON p.genero_id = g.id
            WHERE p.id = ?`, [id]);
        
        if (result.length === 0) {
            return res.status(404).json({ message: "estrenos no encontrada" });
        }
        res.json(result[0]);  // Devolver los datos de la estreno como JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener la estrenos" });
    }
});

// Endpoint para obtener estrenos por género
router.get('/genero/:genero', async (req, res) => {
    try {
        const { genero } = req.params;
        const [result] = await pool.query(`
            SELECT p.*, g.nombre AS genero_nombre 
            FROM estrenos p
            LEFT JOIN generos g ON p.genero_id = g.id
            WHERE g.nombre = ?`, [genero]);
        
        if (result.length === 0) {
            return res.status(404).json({ message: "No se encontraron estrenos para este género" });
        }
        res.json(result);  // Devolver las estrenos del género como JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las estrenos por género" });
    }
});

module.exports = router;