"use client"

import { FC, useState } from "react"
import style from "./BestProductList.module.css"
import Product from "@/entities/Product/ui/Product"
import useStorage from "@/shared/ui/useStorage"
import { addLikeInList } from "@/shared/ui/addLikeInList"
import { ItemStore } from "./BestProductListTypes"
import UseGetGrade from "@/shared/Hookcs/UseGetGrade"
import { Iproduct, TypeCategory } from "@/shared/types/types"

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
  dataList: Iproduct[] | any
  category: TypeCategory[]
}> = ({ dataList, category }) => {
  const [count, setCount] = useState<ItemStore[]>([])
  const [grade, setGrade] = useState([])

  useStorage(setCount)
  addLikeInList(dataList, count)
  UseGetGrade(setGrade, dataList)

  return (
    <div className={`container ${style.bestList}`}>
      {dataList.map((item: any) => (
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
