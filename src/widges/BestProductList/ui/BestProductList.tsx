"use client"

import { FC, useState } from "react"
import style from "./BestProductList.module.css"
import Product, { Item } from "@/entities/Product/ui/Product"
import useStorage from "@/shared/ui/useStorage"
import { addLikeInList } from "@/shared/ui/addLikeInList"

export type ItemStore = {
  id: number
  name: string
  imageUrl: string
  price: number
  best: boolean
  weight: number
  none: boolean
  drip: boolean
  categoryId: number
  like: boolean | undefined
}

const BestProductList: FC<{ dataList: Item[] }> = ({ dataList }) => {
  const [count, setCount] = useState<ItemStore[]>([])
  const [state, setState] = useState<boolean>(false)

  useStorage(state, setCount)
  addLikeInList(dataList, count)

  return (
    <div
      className={`container ${style.bestList}`}
      onClick={() => setState(!state)}
    >
      {dataList.map((item) => (
        <Product key={item.id} item={item} />
      ))}
    </div>
  )
}

export default BestProductList
