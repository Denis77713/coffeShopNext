"use client"

import { FC, useEffect, useState } from "react"
import Image from "next/image"
import style from "./like.module.css"
import { handleclick,getState } from "./FunctionsLike"
import { Item } from "@/entities/Product/ui/ProductType"

export type IntStorageData = {
  id: number
  like: boolean
}

const Like: FC<{ item: Item }> = ({ item }) => {
  const [state, setState] = useState<boolean>()

  useEffect(() => {
    setState(getState(item))
  })
  
  return (
    <Image
      className={style.like}
      src={state ? "/product/ico/likeActive.svg" : "/product/ico/like.svg"}
      alt="like"
      width={30}
      height={30}
      onClick={() => {
        getState(item)
        handleclick(item, setState)
      }}
    />
  )
  
}
export default Like
