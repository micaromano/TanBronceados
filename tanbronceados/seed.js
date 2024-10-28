// seed.js
const bcrypt = require('bcrypt');

async function seedAdmin() {
  const adminUsername = 'admin';
  const adminPassword = 'mica';
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  console.log('Admin Username:', adminUsername);
  console.log('Hashed Admin Password:', hashedPassword);
  // aca se inserta el usuario en una base de datos en vez de dejar el hash
}

seedAdmin().catch((err) => {
  console.error('Error seeding admin:', err);
  process.exit(1);
}).finally(() => {
  process.exit(0);
});
