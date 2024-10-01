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


// Ruta para obtener el perfil del usuario con géneros
enrutador.get('/perfil/:id', async (req, res) => {
  const { id } = req.params; // ID del usuario

  try {
    // Obtener el nombre del usuario
    const [usuario] = await db.query('SELECT nombre_usuario FROM usuarios WHERE id = ?', [id]);

    if (usuario.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Obtener los géneros favoritos del usuario
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

// Ruta para obtener todos los géneros
enrutador.get('/generos', async (req, res) => {
  try {
    const [generos] = await db.query('SELECT id, nombre FROM generos');
    res.json(generos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener los géneros' });
  }
});

// Ruta para actualizar el perfil del usuario
enrutador.put('/perfil/:id', async (req, res) => {
  const { id } = req.params;  // Obtener el ID del usuario de los parámetros de la ruta
  const { nombre_usuario, contraseña, generos } = req.body;  // Extraer datos del cuerpo de la solicitud

  try {
    // Actualizar el nombre de usuario
    await db.query('UPDATE usuarios SET nombre_usuario = ? WHERE id = ?', [nombre_usuario, id]);

    // Si la contraseña está presente, encriptarla y actualizarla
    if (contraseña) {
      const contraseñaCifrada = await bcrypt.hash(contraseña, 10);  // Cifrar la nueva contraseña
      await db.query('UPDATE usuarios SET contraseña = ? WHERE id = ?', [contraseñaCifrada, id]);
    }

    // Actualizar géneros favoritos (opcional)
    if (generos && generos.length > 0) {
      // Primero eliminamos los géneros actuales del usuario
      await db.query('DELETE FROM usuarios_generos WHERE usuario_id = ?', [id]);

      // Luego insertamos los nuevos géneros
      const generosValues = generos.map((generoId) => [id, generoId]);
      await db.query('INSERT INTO usuarios_generos (usuario_id, genero_id) VALUES ?', [generosValues]);
    }

    res.status(200).json({ mensaje: 'Perfil actualizado con éxito' });  // Responder con éxito
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el perfil del usuario' });  // Manejo de errores
  }
});



module.exports = enrutador;
