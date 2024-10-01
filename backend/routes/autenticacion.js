const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database');

const enrutador = express.Router();

// Ruta para registrar usuario
enrutador.post('/registro', async (req, res) => {
  const { nombre_usuario, contraseña, generos } = req.body; // Añadir los géneros seleccionados

  try {
    // Cifrar la contraseña
    const contraseñaCifrada = await bcrypt.hash(contraseña, 10);

    // Insertar usuario en la base de datos
    const [resultado] = await db.query('INSERT INTO usuarios (nombre_usuario, contraseña) VALUES (?, ?)', [nombre_usuario, contraseñaCifrada]);

    const usuarioId = resultado.insertId;

    // Insertar géneros favoritos en la tabla usuarios_generos
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

// Ruta para iniciar sesión
enrutador.post('/login', async (req, res) => {
  const { nombre_usuario, contraseña } = req.body;

  try {
    // Buscar el usuario en la base de datos
    const [filas] = await db.query('SELECT * FROM usuarios WHERE nombre_usuario = ?', [nombre_usuario]);
    const usuario = filas[0];

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Comparar contraseña de bdd con la ingresada
    const esCoincidente = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!esCoincidente) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    // Generar token y devolver usuario_id
    const token = jwt.sign({ id: usuario.id }, 'tu_secreto', { expiresIn: '1h' });

    // Enviar el token y el usuario_id
    res.json({ token, usuario_id: usuario.id });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});


module.exports = enrutador;
