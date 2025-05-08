"use client"

import Product from "@/entities/Product/ui/Product"
import { addLikeInList } from "@/shared/ui/addLikeInList"
import useStorage from "@/shared/ui/useStorage"
import { FC, useState } from "react"
import style from "./ProductList.module.css"
import { ItemStore } from "@/widges/BestProductList/ui/BestProductListTypes"
import bestStyle from "@/widges/BestProductList/ui/BestProductList.module.css"
import UseGetGrade from "@/shared/Hookcs/UseGetGrade"
import { Iproduct, TypeCategory } from "@/shared/types/types"

const ProductList: FC<{
  res: Iproduct[]
  category: TypeCategory[]
}> = ({ res, category }) => {
  const [count, setCount] = useState<ItemStore[]>([])
  const [state, setState] = useState<boolean>(false)
  const [grade, setGrade] = useState([])

  UseGetGrade(setGrade, res)

  useStorage(state, setCount)
  addLikeInList(res, count)
  return (
    <div
      className={`${style.bestList} ${bestStyle.bestList}`}
      onClick={() => setState(!state)}
    >
      {res.map((item) => (
        <Product
          key={item.id}
          item={item}
          category={category}
          grade={grade && grade}
        />
      ))}
    </div>
  )
}

export default ProductList
