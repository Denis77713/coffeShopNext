"use client"

import { useState, useEffect, FC } from "react"
import { IntProudctItem } from "@/entities/Product/ui/Product"
import Image from "next/image"
import style from "./like.module.css"
import { handleclick } from "./FunctionsLike"
import { useDispatch } from "react-redux"
import { getLike } from "@/features/likeGroup/ui/SlicelikeGroup"

export interface IntStorageData {
  id: number
  like: boolean
}

const Like: FC<IntProudctItem> = ({ item, list }) => {
  const dispatch = useDispatch()
  const [count, setCount] = useState<any>(true)
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
  let img = ""
  if (count === true) {
    img = "/product/ico/like.svg"
  } else {
    img = "/product/ico/likeActive.svg"
    console.log(count)
  }
  return (
    <Image
      className={style.like}
      src={img}
      alt="like"
      width={30}
      height={30}
      onClick={() => handleclick(item, list, state, setState)}
    />
  )
}
export default Like
