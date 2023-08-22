import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getThoughtTags(thoughtId: number) {
  const response = await prisma.thoughtTag.findMany({
    where: {
      thoughtId,
    },
    select: {
      id: true,
      tag: {
        select: {
          name: true,
        },
      },
    },
  })

  return response
}
