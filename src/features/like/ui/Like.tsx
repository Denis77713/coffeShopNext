"use client"

import { useState, useEffect, FC } from "react"
import { IntProudctItem, IntProductItems } from "@/entities/Product/ui/Product"
import Image from "next/image"
import style from "./like.module.css"

const Like: FC<IntProudctItem> = ({ item }) => {
  const [count, setCount] = useState<any>(false)
  let num = true
  useEffect(() => {
    const savedValue = window.localStorage.getItem(`like${item.id}`)
    savedValue && setCount(savedValue)
  }, [count])

  return (
    <Image
      className={style.like}
      src={
        count === "true"
          ? "/product/ico/likeActive.svg"
          : "/product/ico/like.svg"
      }
      alt="like"
      width={30}
      height={30}
      onClick={() => handleclick(item)}
    />
  )
  function handleclick(item: IntProductItems): void {
    const result = localStorage.getItem(`like${item.id}`)
    if (result === null || result === "false") {
      setCount(localStorage.setItem(`like${item.id}`, "true"))
    }else{
      setCount(localStorage.setItem(`like${item.id}`, "false"))
    }
  }
}
export default Like
