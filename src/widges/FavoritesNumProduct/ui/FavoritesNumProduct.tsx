"use client"

import Button from "@/shared/ui/Button"
import { useSelector } from "react-redux"
import style from './FavoritesNumProduct.module.css'


const FavoritesNumProduct = () => {
  const data = useSelector((store: any) => store.product.product)
  const sum = useSelector((store: any) => store.product.sum)

  let text = "товар"
  if (data > 1) text = "товара"
  if (data > 5) text = "товаров"
  return (
    <div className={style.Info}>
      <p>{`${data} ${text} на сумму: ${sum} руб.`}</p>
      <Button>Купить</Button>
    </div>
  )
}

export default FavoritesNumProduct
