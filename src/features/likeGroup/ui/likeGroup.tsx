"use client"

import Image from "next/image"
import style from "./LikeGroup.module.css"
import { useSelector } from "react-redux"
import { IntStorageData } from "@/features/like/ui/Like"

const LikeGroup = () => {
  const data = useSelector((store: any) => store.like.storage)
  const result = data.filter((item: IntStorageData) => item.like === true)
  console.log(result.length)

  return (
    <div className={style.wrapper}>
      <Image
        className={style.icon}
        src={"/like.svg"}
        alt="cart"
        width={30}
        height={30}
      />
      {result.length > 0 && <div className={style.num}>{result.length}</div>}
    </div>
  )
}

export default LikeGroup
