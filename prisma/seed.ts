const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Create test company
  const company = await prisma.company.create({
    data: {
      name: 'Test Company',
      googleReviewLink: 'https://g.page/r/test-company/review',
      notifyEmail: 'notifications@test.com',
      notifyOnNegative: true,
    },
  });

  // Create test user with password
  const hashedPassword = await bcrypt.hash('password123', 10);
  await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
      role: 'ADMIN',
      companyId: company.id,
    },
  });

  // Create test appointments
  const appointments = await Promise.all(
    Array.from({ length: 5 }).map((_, i) =>
      prisma.appointment.create({
        data: {
          companyId: company.id,
          customerName: `Customer ${i + 1}`,
          customerEmail: `customer${i + 1}@example.com`,
          date: new Date(Date.now() + i * 24 * 60 * 60 * 1000),
        },
      })
    )
  );

  // Create test feedback
  await Promise.all(
    appointments.map((appointment, i) =>
      prisma.feedback.create({
        data: {
          appointmentId: appointment.id,
          companyId: company.id,
          score: Math.floor(Math.random() * 5) + 1,
          comment: `Test feedback ${i + 1}`,
          redirectedToGoogle: false,
        },
      })
    )
  );

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });