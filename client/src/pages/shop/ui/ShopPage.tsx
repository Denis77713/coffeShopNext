import Search from "@/features/Search/ui/Search"
import ProductList from "@/widges/ProductList/ui/ProductList"
import FilterList from "@/widges/FilterList/ui/FilterList"
import { getCategory } from "./getProductAndFilters"
import { FC } from "react"
import { getCategoryes } from "@/widges/CategoryList/api/api"
import Pagination from "@/features/Pagination/ui/Pagination"
import IsToken from "@/shared/Hookcs/IsToken"

export type IParams = {
  id: string
}

const ShopPage: FC<{ params: IParams; searchParams: string }> = async ({
  params,
  searchParams,
}) => {
  //
  //
  console.log(searchParams)
  const numProductInPage = 8
  const res = await getCategory(`/${params.id}`, searchParams, numProductInPage)
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
