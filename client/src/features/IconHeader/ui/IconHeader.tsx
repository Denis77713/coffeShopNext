"use client"

import Image from "next/image"
import style from "./IconHeader.module.css"
import { FC, useMemo } from "react"
import header from "../../../widges/header/ui/Header.module.css"
import { useSelector } from "react-redux"
import { Iproduct } from "@/shared/types/types"

interface IiconHeader {
  image: string
  alt: string
  num: Iproduct[]
  func: any
}

const IconHeader: FC<IiconHeader> = ({ image, alt, num, func }) => {
  const memoizedValue = useMemo(() => func, [num])
  console.log(memoizedValue)
  return (
    <div className={header.like}>
      <div className={style.wrapper}>
        <Image
          className={style.icon}
          src={image}
          alt={alt}
          width={30}
          height={30}
        />
      </div>
      {memoizedValue.length > 0 && (
        <div className={style.num}>{memoizedValue.length}</div>
      )}
      <div className={style.window}></div>
    </div>
  )
}

export default IconHeader
