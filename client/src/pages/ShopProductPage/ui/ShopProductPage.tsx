import { IParams } from "@/pages/shop/ui/ShopPage"
import IsToken from "@/shared/Hookcs/IsToken"
import ProductInProductPage, {
  IproductID,
} from "@/widges/ProductInProductPage/ui/ProductInProductPage"
import { FC } from "react"
import style from "./ShopProductPage.module.css"
import FormImages from "@/features/FormImages/ui/FormImages"
//
//
const ShopProductPage: FC<{
  params: IParams
  searchParams: IproductID
}> = async ({ params, searchParams }) => {
  return (
    <main className={`container ${style.mtop}`}>
      <IsToken />
      <ProductInProductPage params={params} searchParams={searchParams} />
    </main>
  )
}

export default ShopProductPage
