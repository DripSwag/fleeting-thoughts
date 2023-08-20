import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function createThought(text: string, userId: number) {
  const response = await prisma.thought.create({
    data: {
      text,
      userId,
    },
  })
  return response
}

export async function getThoughts(userId: number) {
  const response = await prisma.user.findFirst({
    where: { id: userId },
    select: {
      username: false,
      password: false,
      id: false,
      thoughts: true,
    },
  })
  return response
}
