"use server"

import { prisma } from "../../../prisma/prisma-client"

export async function deleteComment(id: number) {
  const result = await prisma.gradeStar.delete({
    where: {
      id: id,
    },
  })
  return result
}
