"use client"

import Product from "@/entities/Product/ui/Product"
import { FC, useEffect, useState } from "react"
import style from "./FavoritesList.module.css"
import { useDispatch } from "react-redux"
import { getProductNum, getProductSum } from "@/shared/reducers/FavoriteSlice"
import { getLike } from "@/shared/reducers/SlicelikeGroup"
import { ItemStore } from "@/widges/BestProductList/ui/BestProductListTypes"
import { TypeCategory } from "@/widges/ProductList/ui/ProductList"
import bestStyle from "@/widges/BestProductList/ui/BestProductList.module.css"
import UseGetGrade from "@/shared/Hookcs/UseGetGrade"

const FavoritesList: FC<{ category: TypeCategory[] }> = ({ category }) => {
  const [count, setCount] = useState<ItemStore[]>([])
  const [state, setState] = useState<boolean>(false)
  const dispatch = useDispatch()
  const [grade, setGrade] = useState([])

  UseGetGrade(setGrade, count)

  useEffect(() => {
    const storageJson: string | null = localStorage.getItem("like")

    if (storageJson) {
      const storageData: ItemStore[] = JSON.parse(storageJson)
      const storageDataFilter: ItemStore[] = storageData.filter(
        (item) => item.like === true
      )
      setCount(storageDataFilter)
    }
  }, [state])

  useEffect(() => {
    const price = count
      .map((item) => Number(item.price))
      .reduce((acc, val, i, arr) => {
        return acc + val
      }, 0)
    dispatch(getProductSum(price))
    dispatch(getProductNum(count.length))
    dispatch(
      getLike(
        count.sort((a: ItemStore, b: ItemStore) => (a.id > b.id ? 1 : -1))
      )
    )
  }, [count])
  return (
    <div className={` ${bestStyle.bestList}`} onClick={() => setState(!state)}>
      {count.map((item) => (
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

export default FavoritesList
