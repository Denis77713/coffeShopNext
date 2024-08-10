"use client"

import { useState, useEffect, FC } from "react"
import { IntProudctItem, IntProductItems } from "@/entities/Product/ui/Product"
import Image from "next/image"
import style from "./like.module.css"

const Like: FC<IntProudctItem> = ({ item }) => {
  const [count, setCount] = useState<any>(true)
  const [state, setState] = useState(false)

  useEffect(() => {
    const savedValue = window.localStorage.getItem(`like`)
    console.log(JSON.parse(savedValue).sort((a, b) => (a.id > b.id ? 1 : -1)))
    savedValue &&
    setCount(JSON.parse(savedValue).sort((a, b) => (a.id > b.id ? 1 : -1)))
    console.log(count)
  }, [state])
  
  return (
    <Image
      className={style.like}
      src={
        count !== true && count[item.id - 1].like === true
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
    const arr = JSON.parse(localStorage.getItem("like"))
    setState(!state)
    const newArr = arr.filter((value: any) => value.id !== item.id)
    newArr.push({ id: item.id, like: state })
    localStorage.setItem("like", JSON.stringify(newArr))
    // localStorage.setItem("like", JSON.stringify([{id:1,like:true},{id:2,like:true},{id:3,like:true},{id:4,like:true}]))
  }
}
export default Like
