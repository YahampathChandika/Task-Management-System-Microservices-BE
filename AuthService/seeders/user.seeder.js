const bcrypt = require('bcrypt');
const { Users } = require('../models');

async function seed() {
  const hashed = await bcrypt.hash('password', 10);
  await Users.create({ username: 'admin', password: hashed });
  console.log('Seed complete');
  process.exit();
}

seed();