const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database');
const enrutador = express.Router();

enrutador.post('/registro', async (req, res) => {
  const { nombre_usuario, contraseña, generos } = req.body;
  try {
    const contraseñaCifrada = await bcrypt.hash(contraseña, 10);
    const [resultado] = await db.query('INSERT INTO usuarios (nombre_usuario, contraseña) VALUES (?, ?)', [nombre_usuario, contraseñaCifrada]);
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

module.exports = enrutador;