import { PrismaClient } from '.prisma/client'
import { SHA256 } from 'crypto-js'

const prisma = new PrismaClient()

export async function createUser(username: string, password: string) {
  const response = await prisma.user.create({
    data: {
      username,
      password: SHA256(password).toString(),
    },
  })
  return response
}

export async function login(username: string, password: string) {
  const user = await getUser(username, password)
  if (user) {
    const currentTime = new Date(Date.now() + 4 * 60 * 60 * 1000)
    const response = await prisma.session.create({
      data: {
        expireDate: currentTime,
        userId: user.id,
      },
      select: {
        id: true,
        expireDate: true,
        createDate: true,
      },
    })
    return { id: user.id, token: response }
  }
}

async function getUser(username: string, password: string) {
  const response = await prisma.user.findFirst({
    where: {
      username,
      password: SHA256(password).toString(),
    },
    select: {
      id: true,
    },
  })
  return response
}
