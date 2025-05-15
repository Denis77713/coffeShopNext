"use client"

import Image from "next/image"
import style from "./Product.module.css"
import Like from "@/shared/like/ui/Like"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { addCookie, getPageCategory } from "./ProductController"
import Button from "@/shared/ui/Button"
import { addProductCard } from "../api/api"
import { useDispatch, useSelector } from "react-redux"
import { getRenderCart, getWindow } from "@/shared/reducers/FormSlice"
import GradeStar from "@/shared/Star/GradeStar"
import { FC, useEffect, useState } from "react"
import UseGetStar from "@/shared/Hookcs/UseGetStar"
import {
  Iproduct,
  Star,
  TypeCategory,
  TypeProductPay,
} from "@/shared/types/types"

const Product: FC<{
  item: Iproduct
  category: TypeCategory[]
  pay?: boolean
  path?: string
  isLike?: boolean
  grade: Star[]
  imageUrl?: string
  prductPay?: boolean | TypeProductPay[] | any
}> = ({
  item,
  category,
  pay = true,
  path,
  isLike = true,
  grade,
  imageUrl = null,
  prductPay = false,
}) => {
  const dispatch = useDispatch()
  const renderCart = useSelector((store: any) => store.FormSlice.renderCart)
  const pathname = usePathname()
  const url = getPageCategory(item, category, pathname)
  const [num, setNum] = useState(0)
  //
  //
  const [state, setState] = useState(0)
  //
  //
  UseGetStar(grade, setState, item)
  //
  //
  useEffect(() => {
    if (prductPay) {
      const numProd = prductPay
        .filter((i: TypeProductPay) => i.productId === item.id)
        .reduce((acc: any, number: TypeProductPay) => acc + number.num, 0)
      setNum(numProd)
    }
  }, [prductPay])
  //
  //
  const Auth = useSelector((store: any) => store.FormSlice.Auth)
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
              src={imageUrl ? imageUrl : `/product/${item.imageUrl}`}
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
      <div className={style.gradeAndButton}>
        <GradeStar
          grade={state >= 5 ? 5 : state}
          productId={item.id}
          clicked={false}
        />
        {prductPay && <div>Товаров: {num}</div>}
        {item.number <= 0 && pay && Auth === 200 && (
          <Button>Товара нет в наличии</Button>
        )}
        {pay && Auth === 200 && item.number > 0 && (
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
    </div>
  )
}
export default Product
