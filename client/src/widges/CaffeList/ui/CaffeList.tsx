"use client"

import Product from "@/entities/Product/ui/Product"
import { FC, useState } from "react"
import style from "./CaffeList.module.css"
import { Iproduct, TypeCategory } from "@/shared/types/types"
import UseGetGrade from "@/shared/Hookcs/UseGetGrade"
import UseLogin from "@/shared/Hookcs/UseLogin"

const CaffeList: FC<{
  products: Iproduct[] | any
  categoryId: number
  category: TypeCategory[]
}> = ({ products, categoryId, category }) => {
  const data = products.filter(
    (i: Iproduct) => i.secondCategoryId === categoryId
  )
  const [grade, setGrade] = useState([])
  UseGetGrade(setGrade, data, false)
  // UseLogin()
  return (
    <div className={`container ${style.caffeList}`}>
      {data.map((item: Iproduct) => (
        <Product
          key={item.id}
          item={item}
          category={category}
          grade={grade && grade}
          imageUrl={`/product/${item.imageUrl}`}
          pay={false}
        />
      ))}
    </div>
  )
}

export default CaffeList
