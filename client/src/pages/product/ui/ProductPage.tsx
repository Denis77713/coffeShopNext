import IsToken from "@/shared/Hookcs/IsToken"
import ProductInProductPage from "@/widges/ProductInProductPage/ui/ProductInProductPage"
import { FC } from "react"

const ProductPage: FC = () => {
  return (
    <main className="container">
      <IsToken />
      <ProductInProductPage />
    </main>
  )
}

export default ProductPage
