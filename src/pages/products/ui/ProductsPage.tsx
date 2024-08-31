import Search from "@/features/Search/ui/Search"
import ProductList from "@/widges/ProductList/ui/ProductList"
import FilterList from "@/widges/FilterList/ui/FilterList"
import { getCategory } from "./getProductAndFilters"
import { FC } from "react"
import { getCategoryes } from "@/widges/CategoryList/api/api"

export type IParams = {
  id: string
}

const ProductsPage: FC<{ params: IParams; searchParams: any }> = async ({
  params,
  searchParams,
}) => {
  const res = await getCategory(`/${params.id}`, searchParams)
  const category = await getCategoryes()
  return (
    <main className="container">
      <Search />
      <FilterList filters={res.filtersData} />
      <ProductList res={res.productData} category={category}/>
    </main>
  )
}

export default ProductsPage
