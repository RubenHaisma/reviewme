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

  // Create test customers (20 instead of 5)
  const customers = await Promise.all(
    Array.from({ length: 20 }).map((_, i) =>
      prisma.customer.create({
        data: {
          companyId: company.id,
          name: `Customer ${i + 1}`,
          email: `customer${i + 1}@example.com`,
          phone: `555-00${String(i + 1).padStart(2, '0')}`,
        },
      })
    )
  );

  // Create test appointments linked to customers (20 instead of 5)
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

  // Create 20 test feedback entries linked to appointments and customers
  await Promise.all(
    Array.from({ length: 20 }).map((_, i) =>
      prisma.feedback.create({
        data: {
          appointmentId: appointments[i].id,
          companyId: company.id,
          customerId: customers[i].id,
          score: Math.floor(Math.random() * 5) + 1,
          comment: `Test feedback ${i + 1}`,
          redirectedToGoogle: i % 2 === 0, // Alternate between true/false
        },
      })
    )
  );

  // Create test feedback theme for the company
  await prisma.feedbackTheme.create({
    data: {
      companyId: company.id,
      primaryColor: '#2563eb',
      accentColor: '#1d4ed8',
      logo: 'https://example.com/logo.png',
      customCss: 'body { background: #f0f0f0; }',
    },
  });

  console.log('Seed data with 20 feedback entries created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });