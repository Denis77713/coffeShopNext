"use client"

import { FC, useEffect, useState } from "react"
import Image from "next/image"
import style from "./like.module.css"
import { handleclick, getState, isLikeFilter } from "./FunctionsLike"
import { Iproduct } from "@/shared/types/types"
import { useDispatch } from "react-redux"
import { getLike } from "@/shared/reducers/LikeSlice"

export type IntStorageData = {
  id: number
  like: boolean
}

const Like: FC<{ item: Iproduct }> = ({ item }) => {
  const [state, setState] = useState<boolean>()

  const dispatch = useDispatch()

  useEffect(() => {
    setState(getState(item))
  }, [])

  return (
    <Image
      className={style.like}
      src={state ? "/ico/likeActive.svg" : "/ico/like.svg"}
      alt="like"
      width={30}
      height={30}
      onClick={() => {
        getState(item)
        const data = handleclick(item, setState)
        const res = isLikeFilter(data)
        dispatch(getLike(res))
      }}
    />
  )
}
export default Like
