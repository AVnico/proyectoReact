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

// Endpoint para obtener una película por su ID
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


module.exports = router;
