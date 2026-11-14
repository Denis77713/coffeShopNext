"use server"

import { prisma } from "../../../../prisma/prisma-client"

interface Icategory {
  category: string
  id: number
  image: string
  name: string
  page: string
}

export async function createProduct(
  categoryId: Icategory | null,
  weight: number,
  best: string,
  inputName: string,
  inputNum: string,
  image: string,
  secCat: any
) {
  const drip = weight === 10 ? "true" : "false"

  const result = await prisma.product.create({
    data: {
      name: inputName,
      imageUrl: image,
      price: inputNum,
      best: best,
      weight: String(weight),
      none: "false",
      drip: drip,
      categoryId: categoryId ? categoryId.id : 1,
      secondCategoryId: secCat ? Number(secCat) : null,
    },
  })
  return result
}
export async function getSecondCategory() {
  const result = await prisma.secondCategory.findMany()
  return result
}
export async function getCategory(category: string) {
  const categoryId = await prisma.category.findFirst({
    where: {
      page: `/${category}`,
    },
  })
  return categoryId
}
