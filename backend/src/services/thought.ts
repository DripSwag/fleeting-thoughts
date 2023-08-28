import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function post(userId: number) {
  const response = await prisma.thought.create({
    data: {
      userId,
    },
  })
  return response
}

export async function getUsersThoughts(
  userId: number,
  tags: undefined | Array<string>,
) {
  if (tags) {
    const response = await prisma.thought.findMany({
      where: {
        thoughtTags: {
          some: {
            OR: tags.map(value => {
              return {
                tag: {
                  name: value,
                },
              }
            }),
          },
        },
      },
    })

    return { thoughts: response }
  } else {
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
}

export async function getThought(thoughtId: number) {
  const response = await prisma.thought.findFirst({
    where: { id: thoughtId },
    select: {
      id: false,
      userId: false,
      text: true,
      title: true,
    },
  })
  return response
}

export async function putThought(id: number, text: string) {
  const response = await prisma.thought.update({
    where: {
      id,
    },
    data: {
      text,
    },
  })

  return response
}

export async function patch(id: number, title: string) {
  const response = await prisma.thought.update({
    where: {
      id,
    },
    data: {
      title,
    },
  })

  return response
}

export async function del(id: number) {
  const response = await prisma.thought.delete({
    where: {
      id,
    },
  })

  return response
}
