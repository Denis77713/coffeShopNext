"use client"

import Product from "@/entities/Product/ui/Product"
import { useEffect, useState } from "react"
import style from "./FavoritesList.module.css"
import { useDispatch } from "react-redux"
import {
  getProductNum,
  getProductSum,
} from "@/pages/favorites/ui/FavoriteSlice"
import { getLike } from "@/features/likeGroup/ui/SlicelikeGroup"
import { IntStorageData } from "@/shared/like/ui/Like"
import { ItemStore } from "@/widges/BestProductList/ui/BestProductList"

const FavoritesList = () => {
  const [state, setstate] = useState<ItemStore[]>([])
  const [boolean, setBoolean] = useState<boolean>(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const storageJson: string | null = localStorage.getItem("like")

    if (storageJson) {
      const storageData: ItemStore[] = JSON.parse(storageJson)
      const storageDataFilter: ItemStore[] = storageData.filter(
        (item) => item.like === true
      )
      setstate(storageDataFilter)
    }
  }, [boolean])

  useEffect(() => {
    const price = state
      .map((item) => item.price)
      .reduce((acc, val, i, arr) => {
        return acc + val
      }, 0)
    dispatch(getProductSum(price))
    dispatch(getProductNum(state.length))

    dispatch(
      getLike(
        state.sort((a: IntStorageData, b: IntStorageData) =>
          a.id > b.id ? 1 : -1
        )
      )
    )
  }, [state])
  console.log(state)
  return (
    <div className={style.favorites} onClick={() => setBoolean(!boolean)}>
      {state.map((item) => (
        <Product key={item.id} item={item} />
      ))}
    </div>
  )
}

export default FavoritesList
