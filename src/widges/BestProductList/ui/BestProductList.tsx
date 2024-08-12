import { FC } from "react"
import style from "./BestProductList.module.css"
import Product, { IntProductItems } from "@/entities/Product/ui/Product"

 export interface IntDataList {
  dataList: IntProductItems[]
}

const BestProductList: FC<IntDataList> = async ({ dataList }) => {
  return (
    <div className={`container ${style.bestList} `}>
      {dataList.map((item) => (
        <Product key={item.id} item={item} list={dataList} />
      ))}
    </div>
  )
}

export default BestProductList
