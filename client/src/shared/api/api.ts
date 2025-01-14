import { prisma } from "../../../prisma/prisma-client"

export const getLocations = async () => {
  const result = await prisma.location.findMany()
  return result
}
// const res = await getLocations()
