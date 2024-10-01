const bcrypt = require('bcryptjs');

const cifrarContraseña = async (contraseña) => {
  const contraseñaCifrada = await bcrypt.hash(contraseña, 10);
  console.log(contraseñaCifrada);
};

cifrarContraseña('123'); 
