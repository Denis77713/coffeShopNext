import Image from "next/image"
import { FC } from "react"
import style from "./Product.module.css"
import Like from "@/shared/like/ui/Like"

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

const Product: FC<{ item: Item }> = ({ item }) => {
  console.log(item)
  return (
    <div className={style.bestItem} key={item.id}>
      <div className={style.wrapper}>
        <Image
          src={`/product/${item.imageUrl}.png`}
          alt="ad"
          width={200}
          height={200}
          placeholder="blur"
          blurDataURL="/load.png"
        />
        <Like item={item} />
        <div className={style.weight}>{`${item.weight} г.`}</div>
      </div>
      <div>{item.name}</div>
      <div>{`${item.price} руб.`}</div>
    </div>
  )
}

export default Product
