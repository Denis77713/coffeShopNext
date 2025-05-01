"use client"

import Image from "next/image"
import style from "./Product.module.css"
import Like from "@/shared/like/ui/Like"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { TypeCategory } from "@/widges/ProductList/ui/ProductList"
import { addCookie, getPageCategory } from "./ProductController"
import { Item } from "./ProductType"
import Button from "@/shared/ui/Button"
import { addProductCard } from "../api/api"
import { useDispatch, useSelector } from "react-redux"
import { getRenderCart, getWindow } from "@/shared/reducers/FormSlice"
import GradeStar from "@/shared/Star/GradeStar"
import { useEffect, useState } from "react"
import UseGetStar from "@/shared/Hookcs/UseGetStar"

interface IProduct {
  item: Item | any
  category: TypeCategory[]
  pay?: boolean
  path?: string
  isLike?: boolean
  grade: Star[]
  imageUrl?: any
}

export type Star = {
  comment: string | null
  grade: number
  id: number
  productId: number
  userAnonim: boolean
  userId: number | null
}

const Product = ({
  item,
  category,
  pay = true,
  path,
  isLike = true,
  grade,
  imageUrl = null,
}: IProduct) => {
  const dispatch = useDispatch()
  const renderCart = useSelector((store: any) => store.FormSlice.renderCart)
  const pathname = usePathname()
  const url = getPageCategory(item, category, pathname)
  //
  //
  const [state, setState] = useState(0)
  //
  //
  UseGetStar(grade, setState, item)
  //
  //
  return (
    <div className={style.bestItem} key={item.id}>
      <div className={style.mb}>
        <div className={style.wrapper}>
          <Link
            href={
              path
                ? `${path}${url}?productID=${item.id}`
                : `${url}?productID=${item.id}`
            }
          >
            <Image
              src={imageUrl ? imageUrl : `/product/${item.imageUrl}.png`}
              alt={item.imageUrl}
              width={200}
              height={200}
              placeholder="blur"
              blurDataURL="/load.png"
              onClick={() => addCookie(item.id)}
            />
          </Link>
          {isLike && <Like item={item} />}
          <div className={style.weight}>{`${item.weight} г.`}</div>
        </div>
        <div>{item.name}</div>
        <div>{`${item.price} руб.`}</div>
      </div>
      <GradeStar
        grade={state >= 5 ? 5 : state}
        productId={item.id}
        clicked={false}
      />
      {pay && (
        <Button
          handleClick={() => {
            addProductCard(item)
            dispatch(getRenderCart(!renderCart))
            dispatch(getWindow(""))
          }}
        >
          Купить
        </Button>
      )}
    </div>
  )
}
export default Product
