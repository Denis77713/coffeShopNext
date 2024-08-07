import Image from "next/image"
import { FC } from "react"
import style from "./Product.module.css"

interface IntProductItems {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  best: boolean;
  weight: number;
  none: boolean;
  drip: boolean;
  categoryId: number;
}

interface IntProudctItem {
  item: IntProductItems
}

const Product: FC<IntProudctItem> = ({ item }) => {
  return (
    <div className={style.bestItem} key={item.id}>
      <div className={style.wrapper}>
        <Image
          src={`/product/${item.imageUrl}.png`}
          alt="ad"
          width={200}
          height={200}
        />
        <div className={style.weight}>{`${item.weight} г.`}</div>
      </div>
      <div>{item.name}</div>
      <div>{`${item.price} руб.`}</div>
    </div>
  )
}

export default Product
