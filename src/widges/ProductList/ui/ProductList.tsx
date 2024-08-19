"use client"

import Product, { Item } from "@/entities/Product/ui/Product"
import { addLikeInList } from "@/shared/ui/addLikeInList"
import useStorage from "@/shared/ui/useStorage"
import { ItemStore } from "@/widges/BestProductList/ui/BestProductList"
import { FC, useState } from "react"
import style from './ProductList.module.css'


const ProductList: FC<{ res: Item[] }> = ({ res }) => {
  const [count, setCount] = useState<ItemStore[]>([])
  const [state, setState] = useState<boolean>(false)

  useStorage(state, setCount)
  addLikeInList(res, count)

  return (
    <div className={style.bestList} onClick={() => setState(!state)}>
      {res.map((item) => (
        <Product key={item.id} item={item} />
      ))}
    </div>
  )
}

export default ProductList
