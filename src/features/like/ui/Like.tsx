"use client"

import { useState, useEffect, FC } from "react"
import { IntProudctItem, IntProductItems } from "@/entities/Product/ui/Product"
import Image from "next/image"
import style from "./like.module.css"

interface IntStorageData {
  id: number
  like: boolean
}

const Like: FC<IntProudctItem> = ({ item, list }) => {
  const [count, setCount] = useState<any>(true)
  const [state, setState] = useState(false)

  useEffect(() => {
    const savedValue = window.localStorage.getItem(`like`)
    savedValue &&
      setCount(JSON.parse(savedValue).sort((a, b) => (a.id > b.id ? 1 : -1)))
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
    if (arr !== null) {
      getLocalStorageData(arr)
    } else {
      const arr = list.map((i) => {
        const result = { id: i.id, like: false }
        return result
      })
      getLocalStorageData(arr)
    }

    setState(!state)
  }
  function getLocalStorageData(arr: IntStorageData[]): void {
    const newValue = arr.find((value) => value.id === item.id)
    newValue.like = !newValue.like
    const newArr = arr.filter((value: any) => value.id !== item.id)
    newArr.push(newValue)
    localStorage.setItem("like", JSON.stringify(newArr))
  }
}
export default Like
