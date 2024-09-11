const express = require('express');
const cors = require('cors');
const autenticacionRutas = require('./routes/autenticacion');


const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/autenticacion', autenticacionRutas);


const PUERTO = process.env.PORT || 5000;

app.listen(PUERTO, () => {
  console.log(`Servidor corriendo en el puerto ${5000}`);
});
