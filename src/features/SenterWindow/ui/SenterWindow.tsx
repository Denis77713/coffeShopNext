"use client"

import Image from "next/image"
import style from "./SenterWindow.module.css"
import { FC, useEffect, useState } from "react"
import { IntDataList } from "@/widges/BestProductList/ui/BestProductList"
import { useDispatch, useSelector } from "react-redux"
import { getDataFilter } from "./SenterWindowFunction"
import { IntStorageData } from "@/features/like/ui/Like"
import { getWindow } from "@/features/likeGroup/ui/SlicelikeGroup"

const SenterWindow: FC<IntDataList> = ({ dataList }) => {
  const data: IntStorageData[] = useSelector((store: any) => store.like.storage)
  const window: boolean = useSelector((store: any) => store.like.window)
  const dispatch = useDispatch()

  const result = getDataFilter(data, dataList)

  console.log(window)
  return (
    <>
      {window && (
        <div
          className={style.shadow}
          onClick={() => {
            dispatch(getWindow(!window))
          }}
        >
          <div className={style.window}>
            <Image src={"/close.svg"} alt={"close"} width={30} height={30} />
            {result?.map((item) => (
              <div key={item.id}>{item.name}</div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default SenterWindow
