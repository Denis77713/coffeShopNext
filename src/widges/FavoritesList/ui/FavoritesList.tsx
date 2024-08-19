"use client"

import Product, { Item } from "@/entities/Product/ui/Product"
import { useEffect, useState } from "react"
import style from "./FavoritesList.module.css"
import { useDispatch } from "react-redux"
import {
  getProductNum,
  getProductSum,
} from "@/pages/favorites/ui/FavoriteSlice"
import { getLike } from "@/features/likeGroup/ui/SlicelikeGroup"
import { ItemStore } from "@/widges/BestProductList/ui/BestProductList"

const FavoritesList = () => {
  const [count, setCount] = useState<ItemStore[]>([])
  const [state, setState] = useState<boolean>(false)
  const dispatch = useDispatch()

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
      .map((item) => item.price)
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
    <div className={style.favorites} onClick={() => setState(!state)}>
      {count.map((item) => (
        <Product key={item.id} item={item} />
      ))}
    </div>
  )
}

export default FavoritesList
