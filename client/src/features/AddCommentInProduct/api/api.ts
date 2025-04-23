"use server"

import { prisma } from "../../../../prisma/prisma-client"

export async function postComment(
  comment: string,
  grade: number,
  userId: number,
  productId: number
) {
  const result = await prisma.gradeStar.create({
    data: {
      grade: grade,
      comment: comment,
      userAnonim: false,
      productId: productId,
      userId: userId,
    },
  })
  return result
}
