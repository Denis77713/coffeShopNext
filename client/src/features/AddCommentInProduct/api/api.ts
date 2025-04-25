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

export async function updateComment(
  comment: string,
  grade: number,
  userId: number,
  productId: number
) {
  const result = await prisma.gradeStar.updateMany({
    where: {
      userId: userId,
      productId: productId,
    },
    data: {
      comment: comment,
      grade: grade,
    },
  })
}
