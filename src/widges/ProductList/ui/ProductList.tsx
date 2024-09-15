"use client"

import Product from "@/entities/Product/ui/Product"
import { addLikeInList } from "@/shared/ui/addLikeInList"
import useStorage from "@/shared/ui/useStorage"
import { FC, useState } from "react"
import style from "./ProductList.module.css"
import { Item } from "@/entities/Product/ui/ProductType"
import { ItemStore } from "@/widges/BestProductList/ui/BestProductListTypes"

export type TypeCategory = {
    id: number;
    name: string;
    image: string;
    page: string;
}

const ProductList: FC<{ res: Item[],category:TypeCategory[]  }> = ({ res,category }) => {
  const [count, setCount] = useState<ItemStore[]>([])
  const [state, setState] = useState<boolean>(false)

  useStorage(state, setCount)
  addLikeInList(res, count)
  return (
    <div className={style.bestList} onClick={() => setState(!state)}>
      {res.map((item) => (
        <Product key={item.id} item={item} category={category}
        />
      ))}
    </div>
  )
}

export default ProductList
