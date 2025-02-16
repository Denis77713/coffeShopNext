"use client"

import Image from "next/image"
import style from "./IconHeader.module.css"
import { FC } from "react"
import header from "../../../widges/header/ui/Header.module.css"

interface IiconHeader {
  image: string
  alt: string
  num: any[]
}

const IconHeader: FC<IiconHeader> = ({ image, alt, num }) => {
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
      {num.length > 0 && <div className={style.num}>{num.length}</div>}
      <div className={style.window}></div>
    </div>
  )
}

export default IconHeader
