import { IParams } from "@/pages/shop/ui/ProductsPage"
import IsToken from "@/shared/Hookcs/IsToken"
import ProductInProductPage, {
  IproductID,
} from "@/widges/ProductInProductPage/ui/ProductInProductPage"
import { FC } from "react"

const ProductPage: FC<{ params: IParams; searchParams: IproductID }> = async ({
  params,
  searchParams,
}) => {
  return (
    <main className="container">
      <IsToken />
      <ProductInProductPage params={params} searchParams={searchParams} />
    </main>
  )
}

export default ProductPage
