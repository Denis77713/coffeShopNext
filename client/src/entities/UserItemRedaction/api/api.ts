"use server"

import { prisma } from "../../../../prisma/prisma-client"

export async function updateUser(
  id: number,
  mail: string,
  name: string,
  lastName: string,
  role: string,
  isActivated: boolean
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
      isActivated: isActivated,
    },
  })
  const result = await prisma.user.findMany()
  return result
}
