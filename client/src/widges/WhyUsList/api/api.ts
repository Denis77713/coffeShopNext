import { prisma } from "../../../../prisma/prisma-client"

export const getText = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1))

  const result = await prisma.whyUsList.findMany()
  return result
}
// const res = await getLocations()
