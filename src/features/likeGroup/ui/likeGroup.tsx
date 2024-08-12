"use client"

import Image from "next/image"
import style from "./LikeGroup.module.css"
import { useDispatch, useSelector } from "react-redux"
import { IntStorageData } from "@/features/like/ui/Like"
import { FC, useEffect, useState } from "react"
import { getWindow } from "./SlicelikeGroup"

const LikeGroup: FC = () => {
  const data = useSelector((store: any) => store.like.storage)
  const result = data.filter((item: IntStorageData) => item.like === true)
  const window: boolean = useSelector((store: any) => store.like.window)


  const dispatch = useDispatch()

  return (
    <div className={style.wrapper}>
      <Image
        className={style.icon}
        src={"/like.svg"}
        alt="cart"
        width={30}
        height={30}
        onClick={()=>{
          dispatch(getWindow(!window))
        }}
      />
      {result.length > 0 && <div className={style.num}>{result.length}</div>}
      <div className={style.window}></div>
    </div>
  )
}

export default LikeGroup
