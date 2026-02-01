import 'dotenv/config'
import { PrismaClient } from '../generated/prisma'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({
  adapter,
})

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'test@test.com',
      password_hash: 'hashed_password',
      name: 'Test User',
    },
  });

  console.log('✅ Usuario creado:', user)
};

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
    await pool.end()
  });
