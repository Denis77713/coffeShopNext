"use client"

import Image from "next/image"
import style from "./SenterWindow.module.css"
import { FC, useEffect, useRef, useState } from "react"
import { IntDataList } from "@/widges/BestProductList/ui/BestProductList"
import { useDispatch, useSelector } from "react-redux"
import { getDataFilter } from "./SenterWindowFunction"
import { IntStorageData } from "@/features/like/ui/Like"
import { getWindow } from "@/features/likeGroup/ui/SlicelikeGroup"
import Product from "@/entities/Product/ui/Product"

const SenterWindow: FC<IntDataList> = ({ dataList }) => {
  const data: IntStorageData[] = useSelector((store: any) => store.like.storage)
  const window: boolean = useSelector((store: any) => store.like.window)
  const dispatch = useDispatch()

  const result = getDataFilter(data, dataList)
  console.log(result)
  return (
    <>
      {window && (
        <div
          className={`${style.shadow} shadow`}
          onClick={(e) => windowClick(e)}
        >
          <div className={style.window}>
            <Image
              className={style.close}
              src={"/close.svg"}
              alt={"close"}
              width={30}
              height={30}
              onClick={() => dispatch(getWindow(!window))}
            />
            {result?.map((item) => (
              <Product key={item.id} item={item} list={result} />
            ))}
          </div>
        </div>
      )}
    </>
  )
  function windowClick(e: any) {
    if (e.target.classList[1] === "shadow") dispatch(getWindow(!window))
  }
}

export default SenterWindow
