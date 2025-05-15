import { IParams } from "@/pages/shop/ui/ShopPage"
import { FC } from "react"
import { getProductPay } from "../api/api"
import ProductPayItem from "@/entities/ProductPayItem/ui/ProductPayItem"

const ManagerPage: FC<{ params: IParams; searchParams: string }> = async ({
  params,
  searchParams,
}) => {
  const data = await getProductPay(searchParams)
  console.log(data)
  return (
    <main className="container">
      {data.map((item) => (
        <ProductPayItem key={item.id} item={item} />
      ))}
    </main>
  )
}

export default ManagerPage
