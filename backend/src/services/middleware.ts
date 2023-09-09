import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function ssid(ssid: string) {
  const response = await prisma.session.findFirst({
    where: {
      id: ssid,
    },
  })

  return response
}

export async function thoughtUser(
  ssid: string,
  thoughtId: string,
): Promise<boolean> {
  const [userId, ssidUserId] = await prisma.$transaction([
    prisma.session.findUnique({
      where: {
        id: ssid,
      },
      select: {
        userId: true,
      },
    }),
    prisma.thought.findUnique({
      where: {
        id: parseInt(thoughtId),
      },
      select: {
        userId: true,
      },
    }),
  ])

  return userId?.userId === ssidUserId?.userId ? true : false
}
