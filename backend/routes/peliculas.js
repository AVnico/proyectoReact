// routes/peliculas.js
const express = require('express');
const router = express.Router();
const pool = require('../database');

// Endpoint para obtener todas las películas
router.get('/', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT *, url_trailer FROM peliculas');
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


// Crear o actualizar una película
// Crear o editar película
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

// Endpoint para filtrar películas
router.post('/filtrar', async (req, res) => {
    const { year, name, author, production, genres, director } = req.body;

    try {
        let query = `SELECT p.*, g.nombre AS genero_nombre FROM peliculas p LEFT JOIN generos g ON p.genero_id = g.id WHERE 1=1`;
        const params = [];

        if (year) {
            query += ` AND YEAR(p.fecha_publicacion) = ?`;
            params.push(year);
        }
        if (name) {
            query += ` AND p.nombre LIKE ?`;
            params.push(`%${name}%`);
        }
        if (author) {
            query += ` AND p.autores LIKE ?`;
            params.push(`%${author}%`);
        }
        if (production) {
            query += ` AND p.produccion LIKE ?`;
            params.push(`%${production}%`);
        }
        if (genres && genres.length > 0) {
            query += ` AND p.genero_id IN (?)`;
            params.push(genres);
        }
        if (director) {
            query += ` AND p.director LIKE ?`;
            params.push(`%${director}%`);
        }

        const [result] = await pool.query(query, params);
        res.json(result);
    } catch (error) {
        console.error('Error al filtrar las películas:', error);
        res.status(500).json({ message: 'Error al filtrar las películas' });
    }
});

module.exports = router;