"use client"

import { FC, useState } from "react"
import style from "./BestProductList.module.css"
import Product from "@/entities/Product/ui/Product"
import useStorage from "@/shared/ui/useStorage"
import { addLikeInList } from "@/shared/ui/addLikeInList"
import { TypeCategory } from "@/widges/ProductList/ui/ProductList"
import { ItemStore } from "./BestProductListTypes"
import UseGetGrade from "@/shared/Hookcs/UseGetGrade"

type DataListType = {
  id: number
  name: string
  imageUrl: string
  price: string | null
  best: string | null
  weight: string | null
  none: string
  drip: string
  number: number | null
  secondCategoryId: number | null
  categoryId: number
}

const BestProductList: FC<{
  dataList: DataListType[]
  category: TypeCategory[]
}> = ({ dataList, category }) => {
  const [count, setCount] = useState<ItemStore[]>([])
  const [state, setState] = useState<boolean>(false)
  const [grade, setGrade] = useState([])

  useStorage(state, setCount)
  addLikeInList(dataList, count)
  UseGetGrade(setGrade, dataList)

  return (
    <div
      className={`container ${style.bestList}`}
      onClick={() => setState(!state)}
    >
      {dataList.map((item) => (
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
export default BestProductList
