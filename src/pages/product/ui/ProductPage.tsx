import { FC } from "react"

type params = { id: string; product: string }
const ProductPage: FC<{ params: params }> = async ({ params }) => {
  console.log(params)
  return <main className="container">product</main>
}

export default ProductPage
