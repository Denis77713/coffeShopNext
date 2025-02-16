"use client"

import Image from "next/image"
import { FC } from "react"
import style from "./Product.module.css"
import Like from "@/shared/like/ui/Like"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { TypeCategory } from "@/widges/ProductList/ui/ProductList"
import { addCookie, getPageCategory } from "./ProductController"
import { Item } from "./ProductType"
import Button from "@/shared/ui/Button"
import { addProductCard } from "../api/api"
import { useDispatch, useSelector } from "react-redux"
import { getRenderCart, getWindow } from "@/shared/Form/ui/FormSlice"

const Product: FC<{ item: Item; category: TypeCategory[] }> = ({
  item,
  category,
}) => {
  const dispatch = useDispatch()
  const renderCart = useSelector((store: any) => store.FormSlice.renderCart)

  const pathname = usePathname()
  const url = getPageCategory(item, category, pathname)
  return (
    <div className={style.bestItem} key={item.id}>
      <div className={style.mb}>
        <div className={style.wrapper}>
          <Link href={url}>
            <Image
              src={`/product/${item.imageUrl}.png`}
              alt={item.imageUrl}
              width={200}
              height={200}
              placeholder="blur"
              blurDataURL="/load.png"
              onClick={() => addCookie(item.id)}
            />
          </Link>
          <Like item={item} />
          <div className={style.weight}>{`${item.weight} г.`}</div>
        </div>
        <div>{item.name}</div>
        <div>{`${item.price} руб.`}</div>
      </div>
      <Button
        handleClick={() => {
          addProductCard(item)
          dispatch(getRenderCart(!renderCart))
          dispatch(getWindow(""))
        }}
      >
        Купить
      </Button>
    </div>
  )
}

export default Product
