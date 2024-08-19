"use client"

import { FC } from "react"
import { IntProudctItem } from "@/entities/Product/ui/Product"
import Image from "next/image"
import style from "./like.module.css"

export interface IntStorageData {
  id: number
  like: boolean
}

const Like: FC<IntProudctItem> = ({ item, list }) => {
  
  return (
    <Image
      className={style.like}
      src={item.like?'/product/ico/likeActive.svg':"/product/ico/like.svg"}
      alt="like"
      width={30}
      height={30}
      onClick={() => handleclick(item)}
    />
  )

  function handleclick(item) {
    const jsonData = localStorage.getItem("like")
    const arr = JSON.parse(jsonData)
    if (arr !== null) {
      const filterArr = arr.filter((i) => i.id === item.id)
      if (filterArr.length === 0) {
        const newArr = item
        newArr.like = true
        arr.push(newArr)
        localStorage.setItem("like", JSON.stringify(arr))
        // console.log(arr)
      } else {
        filterArr[0].like = !filterArr[0].like
        arr.splice(filterArr[0].id-1, 1, filterArr[0])
        // console.log(arr)
        localStorage.setItem("like", JSON.stringify(arr))

      }
    } else {
      const newItem = item
      newItem.like = true
      localStorage.setItem("like", JSON.stringify([newItem]))
    }
  }
}
export default Like
