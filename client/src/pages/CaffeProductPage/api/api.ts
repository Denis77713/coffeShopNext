"use server"

import { prisma } from "../../../../prisma/prisma-client"

export async function getProductCaffe(params: string) {
  const category = await prisma.category.findMany({
    where: {
      name: params,
    },
  })
  const result = await prisma.product.findMany({
    where: {
      categoryId: category[0].id,
    },
  })
  const secondCategory = await prisma.secondCategory.findMany()
  return { result: result, secondCategory: secondCategory, category: category }
}
