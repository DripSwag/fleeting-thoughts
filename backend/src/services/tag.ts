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
        connectOrCreate: {
          where: {
            name,
          },
          create: {
            userId: 1,
            name,
          },
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

export async function post(name: string, userId: number, thoughtId: number) {
  const response = await prisma.thoughtTag.create({
    data: {
      thought: {
        connect: {
          id: thoughtId,
        },
      },
      tag: {
        connectOrCreate: {
          where: {
            name,
          },
          create: {
            userId: userId,
            name,
          },
        },
      },
    },
    select: {
      tagId: true,
      tag: {
        select: {
          name: true,
        },
      },
    },
  })

  return response
}
