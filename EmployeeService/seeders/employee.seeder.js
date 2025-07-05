const { Employees } = require('../models');

async function seed() {

  await Employees.create(
    {
        name: 'Alice Johnson',
        email: 'alice@gmail.com',
        phone: '555-123-4567',
        position: 'UX Designer',
    }
    );
  console.log('Seed complete');
  process.exit();
}

seed();