const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database');

const enrutador = express.Router();

// Ruta para registrar usuario
enrutador.post('/registro', async (req, res) => {
  const { nombre_usuario, contraseña } = req.body;

  try {
    
    const contraseñaCifrada = await bcrypt.hash(contraseña, 10);

    // Insertar usuario en la base de datos
    const [resultado] = await db.query('INSERT INTO usuarios (nombre_usuario, contraseña) VALUES (?, ?)', [nombre_usuario, contraseñaCifrada]);

    res.status(201).json({ mensaje: 'Usuario creado con éxito' });
  } catch (error) {
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

    const token = jwt.sign({ id: usuario.id }, 'tu_secreto', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

module.exports = enrutador;
