// routes/peliculas.js
const express = require('express');
const router = express.Router();
const pool = require('../database');

// Endpoint para obtener todas las películas
router.get('/', async (req, res) => {
    const { esInfantil } = req.query;

    try {
        const [peliculas] = await pool.query(
            `SELECT * FROM peliculas WHERE esInfantil = ?`,
            [parseInt(esInfantil, 10)]
        );
        res.status(200).json(peliculas);
    } catch (error) {
        console.error("Error al obtener películas:", error);
        res.status(500).json({ message: "Error al obtener películas." });
    }
});
router.get('/todas', async (req, res) => {
    try {
        const [peliculas] = await pool.query(`SELECT * FROM peliculas`);
        res.status(200).json(peliculas);
    } catch (error) {
        console.error("Error al obtener todas las películas:", error);
        res.status(500).json({ message: "Error al obtener todas las películas." });
    }
});


router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query(`
            SELECT p.*, g.nombre AS genero_nombre, p.url_trailer 
            FROM peliculas p
            LEFT JOIN generos g ON p.genero_id = g.id
            WHERE p.id = ?
        `, [id]);
        if (result.length === 0) {
            return res.status(404).json({ message: "Película no encontrada" });
        }
        res.json(result[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al obtener la película" });
    }
});


router.get('/recomendaciones/:id', async (req, res) => {
    const { id } = req.params; 

    try {
  
        const [generosUsuario] = await db.query(`
            SELECT genero_id FROM usuarios_generos WHERE usuario_id = ?
        `, [id]);

        if (generosUsuario.length === 0) {
            return res.status(404).json({ message: 'El usuario no tiene géneros favoritos' });
        }

        const generoIds = generosUsuario.map(g => g.genero_id);


        const query = `
            SELECT p.* 
            FROM peliculas p 
            WHERE p.genero_id IN (?)
        `;

        const [peliculasRecomendadas] = await db.query(query, [generoIds]);


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


router.post('/editarpel', async (req, res) => {
    const { id, nombre, autores, director, duracion, genero_id, imagen_url } = req.body;

    try {
        if (id) {
            // Si hay un ID, actualizamos la película existente
            const [result] = await pool.query(
                `UPDATE peliculas 
                SET nombre = ?, autores = ?, director = ?, duracion = ?, genero_id = ?, imagen_url = ? 
                WHERE id = ?`,
                [nombre, autores, director, duracion, genero_id, imagen_url, id]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Película no encontrada para actualizar' });
            }

            return res.status(200).json({ message: 'Película actualizada correctamente' });
        } else {
            // Si no hay un ID, creamos una nueva película
            const [result] = await pool.query(
                `INSERT INTO peliculas (nombre, autores, director, duracion, genero_id, imagen_url) 
                VALUES (?, ?, ?, ?, ?, ?)`,
                [nombre, autores, director, duracion, genero_id, imagen_url]
            );

            return res.status(201).json({ message: 'Película creada correctamente', id: result.insertId });
        }
    } catch (error) {
        console.error('Error al guardar la película:', error);
        res.status(500).json({ message: 'Error al guardar la película' });
    }
});
router.delete('/eliminarpel/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM peliculas WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Película no encontrada' });
        }

        res.status(200).json({ message: 'Película eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la película:', error);
        res.status(500).json({ message: 'Error al eliminar la película' });
    }
});

router.post('/agregar', async (req, res) => {
    const { nombre, autores, director, duracion, genero_id, imagen_url } = req.body;

    if (!nombre || !autores || !director || !duracion || !genero_id || !imagen_url) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
    }

    try {
        const [result] = await pool.query(
            `INSERT INTO peliculas (nombre, autores, director, duracion, genero_id, imagen_url) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [nombre, autores, director, duracion, genero_id, imagen_url]
        );

        res.status(201).json({ message: 'Película agregada correctamente.', id: result.insertId });
    } catch (error) {
        console.error('Error al agregar la película:', error);
        res.status(500).json({ message: 'Error al agregar la película.' });
    }
});
router.get('/opciones-filtro', async (req, res) => {
    try {
        const [autores] = await pool.query(`SELECT DISTINCT autores FROM peliculas`);
        const [directores] = await pool.query(`SELECT DISTINCT director FROM peliculas`);
        const [años] = await pool.query(`SELECT DISTINCT YEAR(fecha_publicacion) AS año FROM peliculas`);
        const [producciones] = await pool.query(`SELECT DISTINCT produccion FROM peliculas`);
        const [generos] = await pool.query(`SELECT DISTINCT genero_id FROM peliculas`);

        res.json({
            autores: autores.map((row) => row.autores.split(',').map((autor) => autor.trim())),
            directores: directores.map((row) => row.director),
            años: años.map((row) => row.año),
            producciones: producciones.map((row) => row.produccion),
            generos: generos.map((row) => row.genero_id),
        });
    } catch (error) {
        console.error("Error al obtener opciones de filtros:", error);
        res.status(500).json({ message: "Error al obtener opciones de filtros." });
    }
});

router.post('/filtrar', async (req, res) => {
    const { filtros } = req.body;

    if (!filtros || Object.keys(filtros).length === 0) {
        return res.status(400).json({ message: "Se deben proporcionar filtros." });
    }

    try {
        let query = `SELECT * FROM peliculas WHERE 1=1`;
        const params = [];

        if (filtros.autores && filtros.autores.length > 0) {
            query += ` AND (`;
            filtros.autores.forEach((autor, index) => {
                query += `FIND_IN_SET(?, autores) > 0${index < filtros.autores.length - 1 ? ' OR ' : ''}`;
                params.push(autor);
            });
            query += `)`;
        }

        if (filtros.directores && filtros.directores.length > 0) {
            query += ` AND director IN (?)`;
            params.push(filtros.directores);
        }

        if (filtros.años && filtros.años.length > 0) {
            query += ` AND YEAR(fecha_publicacion) IN (?)`;
            params.push(filtros.años);
        }

        if (filtros.generos && filtros.generos.length > 0) {
            query += ` AND genero_id IN (?)`;
            params.push(filtros.generos);
        }

        if (filtros.producciones && filtros.producciones.length > 0) {
            query += ` AND produccion IN (?)`;
            params.push(filtros.producciones);
        }

        const [result] = await pool.query(query, params);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error al filtrar películas:", error);
        res.status(500).json({ message: "Error al filtrar películas." });
    }
});

module.exports = router;