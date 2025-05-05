"use client"

import { FC, useEffect, useState } from "react"
import Image from "next/image"
import style from "./like.module.css"
import { handleclick, getState } from "./FunctionsLike"
import { Item } from "@/entities/Product/ui/ProductType"
import { useDispatch, useSelector } from "react-redux"
import { getRenderCart } from "@/shared/reducers/FormSlice"
import { Iproduct } from "@/shared/types/types"

export type IntStorageData = {
  id: number
  like: boolean
}

const Like: FC<{ item: Iproduct }> = ({ item }) => {
  const [state, setState] = useState<boolean>()

  useEffect(() => {
    setState(getState(item))
  })
  const renderCart = useSelector((store: any) => store.FormSlice.renderCart)

  const dispatch = useDispatch()
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
        dispatch(getRenderCart(!renderCart))
      }}
    />
  )
}
export default Like
