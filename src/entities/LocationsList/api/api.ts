import { prisma } from "../../../../prisma/prisma-client"

export const getLocations = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000))
  const result = await prisma.location.findMany()
  return result
}
// const res = await getStaticProps()
