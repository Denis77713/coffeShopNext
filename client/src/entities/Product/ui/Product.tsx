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
import { FC, useState } from "react"
import UseGetStar from "@/shared/Hookcs/UseGetStar"
import { Iproduct, Star, TypeCategory } from "@/shared/types/types"

const Product: FC<{
  item: Iproduct
  category: TypeCategory[]
  pay?: boolean
  path?: string
  isLike?: boolean
  grade: Star[]
  imageUrl?: string
}> = ({
  item,
  category,
  pay = true,
  path,
  isLike = true,
  grade,
  imageUrl = null,
}) => {
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
        {item.number <= 0 && pay && <Button>Товара нет в наличии</Button>}
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
