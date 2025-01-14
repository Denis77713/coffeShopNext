"use client"

import Button from "@/shared/ui/Button"
import { useSelector } from "react-redux"
import style from "./FavoritesNumProduct.module.css"

const FavoritesNumProduct = () => {
  const data = useSelector((store: any) => store.product.product)
  const sum = useSelector((store: any) => store.product.sum)

  let text = "товар"
  if (data > 1) text = "товара"
  if (data > 5) text = "товаров"
  return (
    <div className={`${style.Info} ${style.relative}` }>
      {sum !== 0 ? (
        <>
          <p>{`${data} ${text} на сумму: ${sum} руб.`}</p>
          <Button>Купить</Button>
        </>
      ) : (
        <h1 className={style.favoriteItem}>Нет избранных товаров</h1>
      )}
    </div>
  )
}

export default FavoritesNumProduct
