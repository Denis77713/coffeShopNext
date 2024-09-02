import { prisma } from "../../../../prisma/prisma-client"

export async function getProductId(id: number) {
  await new Promise((resolve) => setTimeout(resolve, 1))

  const result = await prisma.product.findMany({
    where: {
      id: id,
    },
  })
  return result
}