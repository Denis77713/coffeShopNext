import Search from "@/features/Search/ui/Search"
import ProductList from "@/widges/ProductList/ui/ProductList"
import FilterList from "@/widges/FilterList/ui/FilterList"
import { getCategory } from "./getProductAndFilters"
import { FC } from "react"
import { getCategoryes } from "@/widges/CategoryList/api/api"
import Pagination from "@/features/Pagination/ui/Pagination"

export type IParams = {
  id: string
}

const ProductsPage: FC<{ params: IParams; searchParams: string }> = async ({params, searchParams}) => {
  const numProductInPage = 8
  const res = await getCategory(`/${params.id}`, searchParams,numProductInPage)
  const category = await getCategoryes()
  // const numProduct = res.numProduct / numProductInPage
  return (
    <main className="container">
      <Search />
      <FilterList filters={res.filtersData} />
      <ProductList res={res.productData} category={category}/>
      <Pagination numProduct = {res.numProduct / numProductInPage}/>
    </main>
  )
}

export default ProductsPage
