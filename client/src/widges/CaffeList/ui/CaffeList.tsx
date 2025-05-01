import Product from "@/entities/Product/ui/Product"
import { TypeCategory } from "@/widges/ProductList/ui/ProductList"
import { FC } from "react"
import style from "./CaffeList.module.css"
import { Iproduct } from "@/shared/types/types"

const CaffeList: FC<{
  products: Iproduct[]
  categoryId: number
  category: TypeCategory[]
}> = ({ products, categoryId, category }) => {
  const data = products.filter(
    (i: Iproduct) => i.secondCategoryId === categoryId
  )

  return (
    <div className={`container ${style.caffeList}`}>
      {data.map((item: Iproduct) => (
        <Product
          key={item.id}
          item={item}
          category={category}
          grade={[]}
          imageUrl={`/cafe/${item.imageUrl}.jpg`}
        />
      ))}
    </div>
  )
}

export default CaffeList
