import { PrismaClient, RoleType } from '@prisma/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function createPresident() {
  const email = 'klaus@gmail.com';
  const password = '1029qpwo';
  const name = 'Klaus';

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      console.log(`User with email ${email} already exists.`);
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user with President role
    const user = await prisma.user.create({
      data: {
        freeName: name,
        email,
        password: hashedPassword,
        role: RoleType.PRESIDENT,
        isEmailVerified: true,
        status: 'ACTIVE'
      }
    });

    console.log('Successfully created President user:');
    console.log({
      id: user.id,
      email: user.email,
      role: user.role,
      status: user.status
    });
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Execute the function
createPresident()
  .catch((e) => {
    console.error('Error in createPresident:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
