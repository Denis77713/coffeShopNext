"use server"

import { prisma } from "../../../../prisma/prisma-client"

export async function getUsers() {
  const result = await prisma.user.findMany()
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
