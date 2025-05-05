"use server"

import { prisma } from "../../../../prisma/prisma-client"

export async function createProduct(
  weight: number,
  best: string,
  inputName: string,
  inputNum: string,
  image: string
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
      categoryId: 1,
    },
  })
  return result
}
