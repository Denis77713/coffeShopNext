import { prisma } from "../../../../prisma/prisma-client"

export const getProduct = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1))

  const result = await prisma.product.findMany({
    where:{
      best: true
    }
  })
  return result
}
// const res = await getLocations()
