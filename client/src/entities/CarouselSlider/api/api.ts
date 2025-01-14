import { prisma } from "../../../../prisma/prisma-client"

export const getSlideImg = async () => {
  const result = await prisma.carousel.findMany()
  return result
}
// const res = await getSlideImg()
