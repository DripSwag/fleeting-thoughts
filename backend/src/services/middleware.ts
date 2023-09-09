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
