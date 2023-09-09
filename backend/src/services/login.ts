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

export async function login(username: string, password: string) {
  const user = await getUser(username, password)
  console.log(user)
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
      password,
    },
    select: {
      id: true,
    },
  })
  return response
}
