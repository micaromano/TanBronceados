const bcrypt = require('bcrypt');

async function generatePasswordHash() {
  const password = 'mica'; // Cambia esto a la contraseña exacta que estás ingresando en el formulario
  const hash = await bcrypt.hash(password, 10);
  console.log('Generated Hash:', hash);

  const isMatch = await bcrypt.compare(password, hash);
  console.log('Does the generated hash match the password "mica"?', isMatch);
}

generatePasswordHash();