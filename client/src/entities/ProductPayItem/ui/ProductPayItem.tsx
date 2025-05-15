"use client"

import { newDataManagerItem } from "@/shared/types/types"
import Image from "next/image"
import { FC } from "react"
import style from "./ProductPayItem.module.css"

const ProductPayItem: FC<{
  item: newDataManagerItem
  state: newDataManagerItem[]
  setState: any
}> = ({ item, state, setState }) => {
  return (
    <div className={style.itemWrapper}>
      <Image
        src={`/product/${item.imageUrl}`}
        width={100}
        height={100}
        alt={item.text}
      />
      <div className={style.dflex}>{item.text}</div>
      <div className={style.dflex}>
        <div className={style.dflex}>Цена:</div>
        <div>{item.sum}</div>
      </div>
      <select name="status" onChange={(e) => handleChange(e, item)}>
        <option value={item.status}>Доставлен</option>
        <option value="Получен">Получен</option>
      </select>
    </div>
  )
  function handleChange(e: any, item: newDataManagerItem) {
    e.preventDefault()
    const newState = state.filter((i) => i.id !== item.id)
    const newItem = item
    newItem.status = e.target.value
    setState([...newState, newItem])
  }
}

export default ProductPayItem
