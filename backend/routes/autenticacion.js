const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database');
const enrutador = express.Router();

enrutador.post('/registro', async (req, res) => {
  const { nombre_usuario, contraseña, generos, contrasenaparental } = req.body;

  if (!contrasenaparental || isNaN(contrasenaparental)) {
      return res.status(400).json({ error: 'La contraseña parental debe ser un número válido.' });
  }

  try {
      const contraseñaCifrada = await bcrypt.hash(contraseña, 10);

      const [resultado] = await db.query(
          'INSERT INTO usuarios (nombre_usuario, contraseña, contrasenaparental) VALUES (?, ?, ?)',
          [nombre_usuario, contraseñaCifrada, contrasenaparental]
      );
      const usuarioId = resultado.insertId;

      if (generos && generos.length > 0) {
          const generosValues = generos.map((generoId) => [usuarioId, generoId]);
          await db.query('INSERT INTO usuarios_generos (usuario_id, genero_id) VALUES ?', [generosValues]);
      }

      res.status(201).json({ mensaje: 'Usuario creado con éxito' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al registrar el usuario' });
  }
});


enrutador.post('/login', async (req, res) => {
  const { nombre_usuario, contraseña } = req.body;
  try {
    const [filas] = await db.query('SELECT * FROM usuarios WHERE nombre_usuario = ?', [nombre_usuario]);
    const usuario = filas[0];
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const esCoincidente = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!esCoincidente) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }
    const token = jwt.sign({ id: usuario.id }, 'tu_secreto', { expiresIn: '1h' });
    res.json({ token, usuario_id: usuario.id });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

enrutador.get('/perfil/:id', async (req, res) => {
  const { id } = req.params; // ID del usuario
  try {
    const [usuario] = await db.query('SELECT nombre_usuario FROM usuarios WHERE id = ?', [id]);
    if (usuario.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const [generos] = await db.query(`
      SELECT g.id, g.nombre 
      FROM generos g 
      JOIN usuarios_generos ug ON g.id = ug.genero_id 
      WHERE ug.usuario_id = ?
    `, [id]);
    res.json({ nombre_usuario: usuario[0].nombre_usuario, generos });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener el perfil del usuario' });
  }
});

enrutador.get('/generos', async (req, res) => {
  try {
    const [generos] = await db.query('SELECT id, nombre FROM generos');
    res.json(generos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los géneros' });
  }
});
// Ruta para verificar la contraseña parental
enrutador.post('/controlparental', async (req, res) => {
  const { usuario_id, contrasena } = req.body;

  
  try {
      // Realiza la consulta para obtener el usuario por ID
      const [filas] = await db.query('SELECT contrasenaparental FROM usuarios WHERE id = ?', [usuario_id]);
      // Verifica si el usuario fue encontrado
      if (filas.length === 0) {
          return res.status(404).json({ error: 'Usuario no encontrado.' });
      }

      const cont = filas[0].contrasenaparental;
      // Compara la contraseña ingresada con la almacenada (en texto plano)
      if (String(cont) === String(contrasena)) {
        return res.status(200).json({ message: 'Acceso concedido al contenido para adultos.' });
    } else {
        return res.status(401).json({ error: 'Contraseña parental incorrecta servidor.' });
    }
  } catch (error) {
      console.error('Error al verificar la contraseña parental:', error);
      return res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

enrutador.post('/favoritos', async (req, res) => {
  const { usuario_id, pelicula_id } = req.body;

  try {
      const [exists] = await db.query(
          'SELECT * FROM favoritos WHERE usuario_id = ? AND pelicula_id = ?',
          [usuario_id, pelicula_id]
      );

      if (exists.length > 0) {
          return res.status(400).json({ message: 'La película ya está en favoritos' });
      }

      await db.query('INSERT INTO favoritos (usuario_id, pelicula_id) VALUES (?, ?)', [usuario_id, pelicula_id]);
      res.status(201).json({ message: 'Película añadida a favoritos' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al agregar a favoritos' });
  }
});

enrutador.get('/favoritos/:usuario_id', async (req, res) => {
  const { usuario_id } = req.params;

  try {
      const [result] = await db.query(
          `SELECT p.* FROM favoritos f
           JOIN peliculas p ON f.pelicula_id = p.id
           WHERE f.usuario_id = ?`,
          [usuario_id]
      );

      res.json(result);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al obtener los favoritos' });
  }
});

enrutador.delete('/favoritos', async (req, res) => {
  const { usuario_id, pelicula_id } = req.query;

  try {
      await db.query('DELETE FROM favoritos WHERE usuario_id = ? AND pelicula_id = ?', [usuario_id, pelicula_id]);
      res.status(200).json({ message: 'Película eliminada de favoritos' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar de favoritos' });
  }
});
// Ruta para obtener el género favorito del usuario
enrutador.get('/usuarios/:usuario_id/genero-favorito', async (req, res) => {
  const { usuario_id } = req.params;

  try {
    const [result] = await db.query(
      `SELECT genero_id FROM usuarios_generos WHERE usuario_id = ?`,
      [usuario_id]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(result[0]);
  } catch (error) {
    console.error("Error al obtener el género favorito del usuario:", error);
    res.status(500).json({ message: "Error al obtener el género favorito" });
  }
});





module.exports = enrutador;