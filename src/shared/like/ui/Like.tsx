"use client"

import { FC } from "react"
import { Item } from "@/entities/Product/ui/Product"
import Image from "next/image"
import style from "./like.module.css"
import { handleclick } from "./FunctionsLike"

export type IntStorageData = {
  id: number
  like: boolean
}

const Like: FC<{ item: Item }> = ({ item }) => {
  return (
    <Image
      className={style.like}
      src={item.like ? "/product/ico/likeActive.svg" : "/product/ico/like.svg"}
      alt="like"
      width={30}
      height={30}
      onClick={() => handleclick(item)}
    />
  )
}
export default Like
