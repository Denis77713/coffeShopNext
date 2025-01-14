import { prisma } from "../../../../prisma/prisma-client"

export const getProduct = async (arrIsIdLikeTrue: number[]) => {
  await new Promise((resolve) => setTimeout(resolve, 1))

  const result = await prisma.product.findMany({
    where: {
      id: { in: arrIsIdLikeTrue },
    },
  })
  return result
}

// const result = await getProduct()
