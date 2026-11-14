"use client"

import { newDataManagerItem } from "@/shared/types/types"
import Image from "next/image"
import { FC } from "react"
import style from "./ProductPayItem.module.css"
import { useSelector } from "react-redux"

const ProductPayItem: FC<{
  item: newDataManagerItem
  state: newDataManagerItem[]
  setState: any
}> = ({ item, state, setState }) => {
  const User = useSelector((store: any) => store.FormSlice.User)
  return (
    <>
      <div className={style.itemWrapper}>
        <Image
          src={`/product/${item.imageUrl}`}
          width={100}
          height={100}
          alt={""}
        />
        <div className={style.wrapperContent}>
          <div className={style.dflex}>{item.text}</div>
          <div>{`Колличество товара:  ${item.num}`}</div>
        </div>
        <div className={style.dflex}>
          <div className={style.dflex}>Цена:</div>
          <div>{item.sum}</div>
        </div>

        <select name="status" onChange={(e) => handleChange(e, item)}>
          <option value={item.status}>{item.textStatus}</option>
          {User.role === "manager" && (
            <option value="Получен-Получен">Получен</option>
          )}
          {User.role === "sklad" && (
            <option value="Delivered-Собран">Собран</option>
          )}
        </select>
      </div>
    </>
  )
  function handleChange(e: any, item: newDataManagerItem) {
    e.preventDefault()
    const newState = state.filter((i) => i.id !== item.id)
    const newItem = item
    const text = e.target.value.split("-")
    newItem.status = text[0]
    newItem.textStatus = text[1]
    setState([...newState, newItem])
  }
}

export default ProductPayItem
