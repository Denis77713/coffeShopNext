import Search from "@/features/Search/ui/Search"
import { prisma } from "../../../../prisma/prisma-client"
import ProductList from "@/widges/ProductList/ui/ProductList"

export const getCategory = async (page: string, query: string) => {
  await new Promise((resolve) => setTimeout(resolve, 1))

  const category = await prisma.category.findMany({
    where: {
      page: page,
    },
  })

  const productData = await prisma.product.findMany({
    where: {
      categoryId: category[0].id,
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
  })
  return productData
}

const ProductPage = async ({ params, searchParams }: any) => {
  const query = searchParams.query
  const res = await getCategory(`/${params.id}`, query)
  return (
    <main className="container">
      <Search />
      <ProductList res={res} />
    </main>
  )
}

export default ProductPage
