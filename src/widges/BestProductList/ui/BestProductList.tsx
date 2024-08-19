"use client"

import { FC, useEffect, useState } from "react"
import style from "./BestProductList.module.css"
import Product, { IntProductItems } from "@/entities/Product/ui/Product"
import { useDispatch } from "react-redux"
import { getLike } from "@/features/likeGroup/ui/SlicelikeGroup"
import { IntStorageData } from "@/shared/like/ui/Like"

export interface IntDataList {
  dataList: IntProductItems[]
}

const BestProductList: FC<IntDataList> = ({ dataList }) => {
  const dispatch = useDispatch()
  const [count, setCount] = useState<any>([])
  const [state, setState] = useState<boolean>(false)

  useEffect(() => {
    const savedValue = window.localStorage.getItem(`like`)
    if (savedValue) {
      setCount(
        JSON.parse(savedValue).sort((a: IntStorageData, b: IntStorageData) =>
          a.id > b.id ? 1 : -1
        )
      )
      dispatch(
        getLike(
          JSON.parse(savedValue).sort((a: IntStorageData, b: IntStorageData) =>
            a.id > b.id ? 1 : -1
          )
        )
      )
    }
  }, [state])
  dataList.forEach((item, index) => {
    if (count[index]) {
      if (item.id === count[index].id) {
        item.like = count[index].like
      }
    }
  })
  return (
    <div
      className={`container ${style.bestList}`}
      onClick={() => setState(!state)}
    >
      {dataList.map((item) => (
        <Product key={item.id} item={item} list={dataList} />
      ))}
    </div>
  )
}

export default BestProductList
