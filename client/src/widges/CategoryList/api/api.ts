import { prisma } from "../../../../prisma/prisma-client"

export const getCategory = async (categoty: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1))

  const result = await prisma.category.findMany({
    where: {
      category: categoty,
    },
  })
  return result
}
export const getCategoryes = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1))

  const result = await prisma.category.findMany()
  return result
}
// const res = await getLocations()
