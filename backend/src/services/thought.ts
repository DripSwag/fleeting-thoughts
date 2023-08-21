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

export async function getUsersThoughts(userId: number) {
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

export async function getThought(thoughtId: number) {
  const response = await prisma.thought.findFirst({
    where: { id: thoughtId },
    select: {
      id: false,
      userId: false,
      text: true,
    },
  })
  return response
}
