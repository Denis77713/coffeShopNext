"use client"

import Image from "next/image"
import style from "./LikeGroup.module.css"
import { useSelector } from "react-redux"
import { FC } from "react"
import Link from "next/link"
import { IntStorageData } from "@/shared/like/ui/Like"
import header from "../../../widges/header/ui/Header.module.css"

const LikeGroup: FC = () => {
  const data = useSelector((store: any) => store.like.storage)
  const result = data.filter((item: IntStorageData) => item.like === true)

  return (
    <Link href={"/favorites"}>
      <div className={header.like}>
        <div className={style.wrapper}>
          <Image
            className={style.icon}
            src={"/like.svg"}
            alt="cart"
            width={30}
            height={30}
          />
        </div>
        {result.length > 0 && <div className={style.num}>{result.length}</div>}
        <div className={style.window}></div>
      </div>
    </Link>
  )
}

export default LikeGroup
