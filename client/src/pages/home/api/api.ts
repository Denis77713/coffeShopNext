import { prisma } from "../../../../prisma/prisma-client"
import { cookies } from 'next/headers'

export const getProduct = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1))

  const result = await prisma.product.findMany({
    where: {
      best: 'true'
    },
  })
  return result
}
// const result = await getProduct()
 
export  async function getCookie() {
  const cookieStore = await cookies()
  const theme = cookieStore.get('refreshToken')
  return theme
}