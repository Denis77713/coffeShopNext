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
      setCount(
        JSON.parse(savedValue).sort((a: IntStorageData, b: IntStorageData) =>
          a.id > b.id ? 1 : -1
        )
      )
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
      onClick={() => handleclick(item, list)}
    />
  )
  function handleclick(item: IntProductItems, list: IntProductItems[]): void {
    const data = localStorage.getItem("like")
    if (data !== null) {
      const arr = JSON.parse(data)
      getLocalStorageData(arr, item)
    } else {
      const arr = list.map((i) => {
        const result = { id: i.id, like: false }
        return result
      })
      getLocalStorageData(arr, item)
    }
    setState(!state)
  }
  function getLocalStorageData(
    arr: IntStorageData[],
    item: IntProductItems
  ): void {
    const newValue = arr.find((value: any) => value.id === item.id)

    if (typeof newValue !== "undefined") {
      newValue.like = !newValue.like
      const newArr = arr.filter((value: any) => value.id !== item.id)
      newArr.push(newValue)
      localStorage.setItem("like", JSON.stringify(newArr))
    }
  }
}
export default Like
