import Search from "@/features/Search/ui/Search"
import ProductList from "@/widges/ProductList/ui/ProductList"
import FilterList from "@/widges/FilterList/ui/FilterList"
import { getCategory } from "./getProductAndFilters"
import { FC } from "react"

interface IParams {
  id: string
}

const ProductPage: FC<{ params: IParams; searchParams: any }> = async ({
  params,
  searchParams,
}) => {
  const query = searchParams.query
  const res = await getCategory(`/${params.id}`, searchParams)
  console.log(searchParams)
  return (
    <main className="container">
      <Search />
      <FilterList filters={res.filtersData} />
      <ProductList res={res.productData} />
    </main>
  )
}

export default ProductPage
