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
import { TypeDevelop } from "@/pages/account/ui/Account"

const ProductPayList: FC<{
  promise: any
  category: TypeCategory[]
  gradeStar: Star[]
  prductPay: TypeDevelop[] | undefined
}> = ({ promise, category, gradeStar, prductPay }) => {
  //
  //
  const [visible, setVisible] = useState(false)
  let data = null
  if (typeof window !== "undefined") {
    const res: any = use(promise)
    data = res?.data?.complitePdoduct
  }
  //
  useEffect(() => {
    setVisible(
      data?.data?.complitePdoduct.length !== 0 ||
        data?.data?.develery.length !== 0
    )
  }, [data])
  //
  //
  //
  //
  return (
    <>
      {category.length !== 0 && prductPay && (
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
      )}
    </>
  )
}

export default ProductPayList
