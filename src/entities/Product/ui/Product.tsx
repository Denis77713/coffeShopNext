"use client"

import Image from "next/image"
import { FC } from "react"
import style from "./Product.module.css"
import Like from "@/shared/like/ui/Like"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { TypeCategory } from "@/widges/ProductList/ui/ProductList"

export type Item = {
  id: number
  name: string
  imageUrl: string
  price: string
  best: string
  weight: string
  none: string
  drip: string
  categoryId: number
  like?: boolean
}

const Product: FC<{ item: Item; category: TypeCategory[] }> = ({
  item,
  category,
}) => {
  const pathname = usePathname()
  
  const url = getPageCategory(item, category, pathname)

  return (
    <div className={style.bestItem} key={item.id}>
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
  )
}

function addCookie(item: number) {
  document.cookie = "cookieName=number; Max-Age=-1;"
  document.cookie = `number=${item}`
}
function getPageCategory(item: Item,category: TypeCategory[],pathname: string | null) : string {
  const filterCategory = category.filter(
    (inner) => inner.id === item.categoryId
  )
  const resultCategory = filterCategory[0].page
  const result = resultCategory.replace("/", "")
  let url = ""
  if (pathname === "/" || pathname === "/favorites") {
    url = `products/${result}/${item.name}`
  } else {
    url = `${result}/${item.name}`
  }
  return url
}
export default Product
