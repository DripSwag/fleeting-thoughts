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

export async function put(id: number, name: string) {
  const response = await prisma.thoughtTag.update({
    where: {
      id,
    },
    data: {
      tag: {
        update: {
          name,
        },
      },
    },
  })

  return response
}

export async function del(id: number) {
  const deleteThoughtTag = await prisma.thoughtTag.delete({
    where: {
      id,
    },
  })

  return deleteThoughtTag
}
