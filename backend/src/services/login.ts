import { PrismaClient } from '.prisma/client'

const prisma = new PrismaClient()

export async function createUser(username: string, password: string) {
  const response = await prisma.user.create({
    data: {
      username,
      password,
    },
  })
  return response
}

export async function getUser(username: string, password: string) {
  const response = await prisma.user.findFirst({
    where: {
      username,
      password,
    },
    select: {
      id: true,
    },
  })
  return response
}
