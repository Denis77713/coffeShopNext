import Product from "@/entities/Product/ui/Product"
import { prisma } from "../../../../prisma/prisma-client"
import ProductList from "@/widges/ProductList/ui/ProductList"

export const getCategory = async (page: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1))

  const category = await prisma.category.findMany({
    where: {
      page: page,
    },
  })

  const productData = await prisma.product.findMany({
    where: {
      categoryId: category[0].id,
    },
  })
  return productData
}

const ProductPage = async ({ params }: any) => {
  const res = await getCategory(`/${params.id}`)
  return (
    <main className="container">
      <ProductList res={res}/>
    </main>
  )
}

export default ProductPage
