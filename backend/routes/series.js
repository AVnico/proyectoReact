// routes/series.js
const express = require('express');
const router = express.Router();
const pool = require('../database');

// Endpoint para obtener todas las series
router.get('/', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM series');
        res.json(result);  
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
        res.json(result[0]);
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
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las series por género" });
    }
});

// Endpoint para obtener temporadas de una serie
router.get('/:id/temporadas', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query(
            'SELECT id, numero_temporada, descripcion FROM temporadas WHERE serie_id = ?',
            [id]
        );
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener las temporadas" });
    }
});

// Endpoint para obtener capítulos de una temporada
router.get('/temporadas/:id/capitulos', async (req, res) => {
    const { id } = req.params;
    try {
        const [result] = await pool.query(
            'SELECT numero_capitulo, titulo, duracion FROM capitulos WHERE temporada_id = ?',
            [id]
        );
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener los capítulos" });
    }
});

router.get('/capitulos/:id', async (req, res) => {
    const { id } = req.params;
    console.log("ID recibido:", id); // Log para depuración

    try {
        const [result] = await pool.query(
            'SELECT numero_capitulo, titulo, duracion FROM capitulos WHERE id = ?',
            [id]
        );

        if (result.length === 0) {
            return res.status(404).json({ message: "Capítulo no encontrado" });
        }

        res.json(result[0]); // Devuelve el capítulo encontrado
    } catch (error) {
        console.error("Error al obtener el capítulo:", error);
        res.status(500).json({ message: "Error al obtener el capítulo" });
    }
});



module.exports = router;
