import { IParams } from "@/pages/shop/ui/ShopPage"
import { FC } from "react"
import { getProductPay } from "../api/api"
import ProductPayItem from "@/entities/ProductPayItem/ui/ProductPayItem"
import ProductPayIList from "@/widges/ProductPayIList/ui/ProductPayIList"

const ManagerPage: FC<{ params: IParams; searchParams: string }> = async ({
  params,
  searchParams,
}) => {
  const data = await getProductPay(searchParams)
  return (
    <main className="container">
      <ProductPayIList data={data} />
    </main>
  )
}

export default ManagerPage
