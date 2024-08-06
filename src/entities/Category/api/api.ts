import { prisma } from "../../../../prisma/prisma-client"

export const getCategory = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1))

  const result = await prisma.category.findMany()
  return result
}
// const res = await getLocations()
