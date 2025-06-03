"use server"

import { prisma } from "../../../../prisma/prisma-client"

export async function getUsers(id: number) {
  const data = await prisma.user.findMany()
  const result = data.filter((item) => item.id !== id)
  return result
}

export async function deleteData(id: number) {
  await prisma.token.delete({
    where: {
      userId: id,
    },
  })

  await prisma.user.delete({
    where: {
      id: id,
    },
  })
  const result = await prisma.user.findMany()
  return result
}
