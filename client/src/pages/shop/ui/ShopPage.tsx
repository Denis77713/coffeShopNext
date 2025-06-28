import Search from "@/features/Search/ui/Search"
import ProductList from "@/widges/ProductList/ui/ProductList"
import FilterList from "@/widges/FilterList/ui/FilterList"
import { getCategory } from "./getProductAndFilters"
import { FC } from "react"
import { getCategoryes } from "@/widges/CategoryList/api/api"
import Pagination from "@/features/Pagination/ui/Pagination"
import IsToken from "@/shared/Hookcs/IsToken"

export type IParams = {
  id: Promise<string>
}

const ShopPage: FC<{
  params: IParams
  searchParams: Promise<string>
}> = async ({ params, searchParams }) => {
  //
  //
  const { id } = await params
  const newParams = await searchParams
  const numProductInPage = 8
  const res = await getCategory(`/${id}`, newParams, numProductInPage)
  const category = await getCategoryes()
  //
  //
  return (
    <main className="container">
      <IsToken />
      <Search />
      <FilterList filters={res.filtersData} />
      <ProductList res={res.productData} category={category} />
      <Pagination numProduct={res.numProduct / numProductInPage} />
    </main>
  )
}

export default ShopPage
