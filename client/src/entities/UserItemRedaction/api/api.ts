"use server"

import { prisma } from "../../../../prisma/prisma-client"

export async function updateUser(
  id: number,
  mail: string,
  name: string,
  lastName: string,
  role: string
) {
  await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      email: mail,
      name: name,
      lastName: lastName,
      role: role,
    },
  })
  const result = await prisma.user.findMany()
  return result
}
