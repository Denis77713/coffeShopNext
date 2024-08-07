import { getProduct } from "../api/api"
import style from "./BestProductList.module.css"
import Product from "@/entities/Product/ui/Product"

const BestProductList = async () => {
  const result = await getProduct()
  return (
    <div className={style.bestList}>
      {result.map((item) => (
        <Product key={item.id} item={item} />
      ))}
    </div>
  )
}

export default BestProductList