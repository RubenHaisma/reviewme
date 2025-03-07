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
  const user = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Test User',
      password: hashedPassword,
      role: 'ADMIN',
      companyId: company.id,
    },
  });

  // Create test customers
  const customers = await Promise.all(
    Array.from({ length: 5 }).map((_, i) =>
      prisma.customer.create({
        data: {
          companyId: company.id,
          name: `Customer ${i + 1}`,
          email: `customer${i + 1}@example.com`,
          phone: `555-000${i + 1}`,
        },
      })
    )
  );

  // Create test appointments linked to customers
  const appointments = await Promise.all(
    customers.map((customer, i) =>
      prisma.appointment.create({
        data: {
          companyId: company.id,
          customerName: customer.name,
          customerEmail: customer.email,
          date: new Date(Date.now() + i * 24 * 60 * 60 * 1000),
        },
      })
    )
  );

  // Create test feedback linked to appointments and customers
  await Promise.all(
    appointments.map((appointment, i) =>
      prisma.feedback.create({
        data: {
          appointmentId: appointment.id,
          companyId: company.id,
          customerId: customers[i].id, // Link to corresponding customer
          score: Math.floor(Math.random() * 5) + 1,
          comment: `Test feedback ${i + 1}`,
          redirectedToGoogle: false,
        },
      })
    )
  );

  // Create test feedback theme for the company (assuming one-to-one relation with @unique)
  await prisma.feedbackTheme.create({
    data: {
      companyId: company.id,
      primaryColor: '#2563eb',
      accentColor: '#1d4ed8',
      logo: 'https://example.com/logo.png',
      customCss: 'body { background: #f0f0f0; }',
    },
  });

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