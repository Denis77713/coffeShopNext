import { IParams } from "@/pages/shop/ui/ShopPage"
import IsToken from "@/shared/Hookcs/IsToken"
import ProductInProductPage, {
  IproductID,
} from "@/widges/ProductInProductPage/ui/ProductInProductPage"
import { FC } from "react"
import style from "./ShopProductPage.module.css"
//
//
const ShopProductPage: FC<{
  params: Promise<IParams>
  searchParams: any
}> = async ({ params, searchParams }) => {
  const { id } = await params
  const newParams = await searchParams
  return (
    <main className={`container ${style.mtop}`}>
      {/* <IsToken /> */}
      <ProductInProductPage params={id} searchParams={newParams} />
    </main>
  )
}

export default ShopProductPage
