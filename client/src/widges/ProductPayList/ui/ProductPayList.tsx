"use client"

import Product from "@/entities/Product/ui/Product"
import { FC, use, useEffect, useState } from "react"
import styleCart from "../../../widges/AccountProductList/ui/AccountProductList.module.css"
import bestList from "../../ProductList/ui/ProductList.module.css"
import bestStyle from "../../BestProductList/ui/BestProductList.module.css"

import style from "@/pages/account/ui/Account.module.css"
import {
  Iproduct,
  Star,
  TypeCategory,
  TypeProductPay,
} from "@/shared/types/types"
import GetProductPay from "@/shared/Hookcs/getProductPay"

const ProductPayList: FC<{
  promise: any
  category: TypeCategory[]
  gradeStar: Star[]
}> = ({ promise, category, gradeStar }) => {
  const [visible, setVisible] = useState(false)
  const res: any = use(promise)
  const data: any = res?.data?.complitePdoduct
  useEffect(() => {
    setVisible(
      data?.data?.complitePdoduct.length !== 0 ||
        data?.data?.develery.length !== 0
    )
  }, [data])
  //
  //
  const [prductPay, setProductPay] = useState<TypeProductPay[]>([])
  GetProductPay(setProductPay, "Успешный заказ", data)
  //
  //
  return (
    <div className={visible ? `container` : `${style.dnone}`}>
      <div className={`${bestList.bestList} ${bestStyle.bestList}`}>
        {data?.map((item: Iproduct) => (
          <div className={styleCart.item} key={item.id}>
            <Product
              item={item}
              category={category}
              pay={false}
              path="shop/"
              grade={gradeStar && gradeStar}
              prductPay={prductPay}
            />
            <div className={styleCart.text}>Товар в пути</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductPayList
