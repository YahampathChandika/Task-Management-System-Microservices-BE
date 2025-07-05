const { Tasks } = require('../models');

async function seed() {

  await Tasks.create(
    {
      title: 'Design Homepage',
      description: 'Create a new design for the homepage that is user-friendly and visually appealing.',
      status: 'TODO',
      dueDate: '2024-01-15',
      employeeId: 1,
    }
    );
  console.log('Seed complete');
  process.exit();
}

seed();