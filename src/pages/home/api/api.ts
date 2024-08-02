import { prisma } from "../../../../prisma/prisma-client"

export const getStaticProps = async () => {
  const result = await prisma.location.findMany()
  return result
}
// const res = await getStaticProps()
