"use client"

import { newDataManagerItem } from "@/shared/types/types"
import Image from "next/image"
import { FC } from "react"

const ProductPayItem: FC<{ item: newDataManagerItem }> = ({ item }) => {
  return (
    <div>
      <Image
        src={`/product/${item.imageUrl}`}
        width={100}
        height={100}
        alt={item.text}
      />
      <div>{item.text}</div>
      <div>
        <div>Цена:</div>
        <div>{item.sum}</div>
      </div>
      <select>
        <option value={item.status}>{item.status}</option>
        <option value="Получен">Получен</option>
        <option value="Отказ">Отказ</option>
      </select>
    </div>
  )
}

export default ProductPayItem
