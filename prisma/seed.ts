import { PrismaClient } from '../src/infrastructure/prisma/client'

const prisma = new PrismaClient({
  accelerateUrl: process.env.PRISMA_ACCELERATE_URL,
})

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'test@test.com',
      password_hash: 'hashed_password',
      name: 'Test User',
    },
  })

  console.log('✅ Usuario creado:', user)
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect()
  })
