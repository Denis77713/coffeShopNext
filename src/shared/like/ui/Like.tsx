"use client"

import { FC, useEffect, useState } from "react"
import Image from "next/image"
import style from "./like.module.css"
import { handleclick } from "./FunctionsLike"
import { Item } from "@/entities/Product/ui/ProductType"
import { ItemStore } from "@/widges/BestProductList/ui/BestProductListTypes"

export type IntStorageData = {
  id: number
  like: boolean
}

const Like: FC<{ item: Item }> = ({ item }) => {
  const [state, setState] = useState<boolean>()

  useEffect(() => {
    setState(getState())
  })
  
  return (
    <Image
      className={style.like}
      src={state ? "/product/ico/likeActive.svg" : "/product/ico/like.svg"}
      alt="like"
      width={30}
      height={30}
      onClick={() => {
        getState()
        handleclick(item, setState)
      }}
    />
  )
  function getState() {
    let result: boolean | undefined = false
    if (typeof window !== "undefined") {
      const jsonData: string | null = localStorage.getItem("like")
      if (jsonData !== null) {
        const arr: ItemStore[] = JSON.parse(jsonData)
        const filterArr = arr.filter((i) => i.id === item.id)
        if (filterArr.length !== 0) result = filterArr[0].like
      }
    }
    return result
  }
}
export default Like
