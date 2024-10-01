const express = require('express');
const cors = require('cors');
const peliculasRoute = require('./routes/peliculas');
const seriesRoute = require('./routes/series');
const estrenosRoute = require('./routes/estrenos');
const autenticacionRutas = require('./routes/autenticacion');
const comentariosRutas = require('./routes/comentarios');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/peliculas', peliculasRoute); 
app.use('/api/series', seriesRoute); 
app.use('/api/estrenos', estrenosRoute); 
app.use('/api/autenticacion', autenticacionRutas);
app.use('/api/comentarios', comentariosRutas);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
