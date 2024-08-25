import Search from "@/features/Search/ui/Search"
import { prisma } from "../../../../prisma/prisma-client"
import ProductList from "@/widges/ProductList/ui/ProductList"
import FilterList from "@/widges/FilterList/ui/FilterList"

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
  const filtersData = await prisma.filter.findMany({
    where: {
      filterId: category[0].id,
    },
  })

  return { productData, filtersData }
}

const ProductPage = async ({ params, searchParams }: any) => {
  const query = searchParams.query
  const res = await getCategory(`/${params.id}`, query)
  return (
    <main className="container">
      <Search />
      <FilterList filters={res.filtersData} />
      <ProductList res={res.productData} />
    </main>
  )
}

export default ProductPage
