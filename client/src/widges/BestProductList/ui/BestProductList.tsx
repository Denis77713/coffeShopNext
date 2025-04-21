"use client"

import { FC, useEffect, useState } from "react"
import style from "./BestProductList.module.css"
import Product from "@/entities/Product/ui/Product"
import useStorage from "@/shared/ui/useStorage"
import { addLikeInList } from "@/shared/ui/addLikeInList"
import { Item } from "@/entities/Product/ui/ProductType"
import { TypeCategory } from "@/widges/ProductList/ui/ProductList"
import { ItemStore } from "./BestProductListTypes"
import { api } from "@/widges/header/api/api"
import UseGetGrade from "@/shared/Hookcs/UseGetGrade"

const BestProductList: FC<{ dataList: Item[]; category: TypeCategory[] }> = ({
  dataList,
  category,
}) => {
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
