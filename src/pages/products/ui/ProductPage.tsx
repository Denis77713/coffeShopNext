import { prisma } from "../../../../prisma/prisma-client"

interface IntCategory {
  props: {
    id: number
  }
}

export const getCategory = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1))

  const result = await prisma.product.findMany()
  return result
}

const ProductPage = async ({ props }: IntCategory) => {
  const res = await getCategory()
  console.log(res)
  return <main className="container">12</main>
}

export default ProductPage
