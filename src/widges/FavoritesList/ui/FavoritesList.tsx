"use client"

import Product, { IntProductItems } from "@/entities/Product/ui/Product"
import { useEffect, useState } from "react"
import style from "./FavoritesList.module.css"
import { useDispatch } from "react-redux"
import {
  getProductNum,
  getProductSum,
} from "@/pages/favorites/ui/FavoriteSlice"
import { getLike } from "@/features/likeGroup/ui/SlicelikeGroup"

const FavoritesList = () => {
  const [state, setstate] = useState<IntProductItems[]>([])
  const [boolean, setBoolean] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const storageJson = localStorage.getItem("like")

    if (storageJson) {
      const storageData: IntProductItems[] = JSON.parse(storageJson)
      const ArrIdIsLikeTrue: IntProductItems[] = storageData.filter(
        (item) => item.like === true
      )
      setstate(ArrIdIsLikeTrue)
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

  return (
    <div className={style.favorites} onClick={() => setBoolean(!boolean)}>
      {state.map((item) => (
        <Product key={item.id} item={item} list={state} />
      ))}
    </div>
  )
}

export default FavoritesList
