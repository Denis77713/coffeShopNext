"use client"

import Product from "@/entities/Product/ui/Product"
import { FC, useEffect, useState } from "react"
import style from "./FavoritesList.module.css"
import { useDispatch } from "react-redux"
import {
  getProductNum,
  getProductSum,
} from "@/pages/favorites/ui/FavoriteSlice"
import { getLike } from "@/features/likeGroup/ui/SlicelikeGroup"
import { ItemStore } from "@/widges/BestProductList/ui/BestProductListTypes"
import { TypeCategory } from "@/widges/ProductList/ui/ProductList"
import bestStyle from "@/widges/BestProductList/ui/BestProductList.module.css"

const FavoritesList:FC <{category: TypeCategory[]}>= ({category}) => {
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
    <div className={`${style.favorites} ${bestStyle.bestList}`} onClick={() => setState(!state)}>
      {count.map((item) => (
        <Product key={item.id} item={item} category={category}/>
      ))}
    </div>
  )
}

export default FavoritesList
