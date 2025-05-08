"use client"

import { IProductCart } from "@/shared/types/types"
import Image from "next/image"
import { FC, useEffect, useState } from "react"
import style from "./CartFormItem.module.css"
import { join } from "path"
//
//
const CartFormItem: FC<{
  item: IProductCart
  deleteProduct: any
  render: boolean
  setRender: any
}> = ({ item, deleteProduct, render, setRender }) => {
  //
  const data: any = localStorage.getItem("cart")
  const cart = JSON.parse(data)
  const filterCart = cart.filter((i: any) => i.id === item.id)
  //
  const [number, setNumber] = useState(
    filterCart[0].numProductsPay ? filterCart[0].numProductsPay : 1
  )
  //
  useEffect(() => {
    const data: any = localStorage.getItem("cart")
    const cart = JSON.parse(data)
    const cartIndex = cart.findIndex((i: any) => i.id === item.id)
    const newData: any = item
    newData.numProductsPay = number
    cart.splice(cartIndex, 1, newData)
    localStorage.setItem("cart", JSON.stringify(cart))
    setRender(!render)
  }, [number])
  //
  return (
    <>
      <div className={style.product} key={item.id}>
        <div className={style.wrapperImgName}>
          <Image
            src={`/product/${item.imageUrl}`}
            alt="cart"
            width={80}
            height={80}
          />
          <div>
            <div className={style.wrapperInner}>
              <p>{item.name}</p>
            </div>
            <div className={style.calc}>
              <p>Количество: </p>
              <Image
                onClick={() => increment(number, item.number)}
                src={`/plus.svg`}
                alt="cart"
                width={30}
                height={30}
              />

              <div>{number}</div>
              <Image
                onClick={() => decrement(number, item.number)}
                src={`/minus.svg`}
                alt="cart"
                width={30}
                height={30}
              />
            </div>
          </div>
        </div>
        <div className={style.wrapperPrise}>
          <p className={style.wrapperPrise__Prise}>{item.price}</p>
          <div className={style.pointer} onClick={() => deleteProduct(item.id)}>
            <Image src={`/close.svg`} alt="cart" width={20} height={20} />
          </div>
        </div>
      </div>
    </>
  )
  function increment(number: number, itemNumber: number) {
    number <= itemNumber - 1 && setNumber(number + 1)
  }
  function decrement(number: number, itemNumber: number) {
    number - 1 >= 1 && setNumber(number - 1)
  }
}

export default CartFormItem
