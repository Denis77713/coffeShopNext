"use client"

import Product, { Star } from "@/entities/Product/ui/Product"
import { getProcuctAccount } from "@/widges/AccountProductList/api/api"
import {
  IDataProductPay,
  IProductPayItem,
} from "@/widges/AccountProductList/ui/AccountProductList"
import { TypeCategory } from "@/widges/ProductList/ui/ProductList"
import { AxiosResponse } from "axios"
import { FC, useEffect, useState } from "react"
import styleCart from "../../../widges/AccountProductList/ui/AccountProductList.module.css"
import style from "./ProductPayList.module.css"
import bestList from "../../ProductList/ui/ProductList.module.css"
import bestStyle from "../../BestProductList/ui/BestProductList.module.css"
import IsLogin from "@/shared/Hookcs/IsLogin"

const ProductPayList: FC<{
  category: TypeCategory[]
  gradeStar: Star[]
}> = ({ category, gradeStar }) => {
  const [visible, setVisible] = useState(false)
  const [data, setData] = useState<
    null | IDataProductPay | AxiosResponse<null, IDataProductPay>
  >(null)

  IsLogin(setData, getProcuctAccount)
  useEffect(() => {
    setVisible(
      data?.data?.complitePdoduct.length !== 0 ||
        data?.data?.develery.length !== 0
    )
  }, [data])

  return (
    <div className={visible ? `container` : `${style.dnone}`}>
      {data?.data?.complitePdoduct.length !== 0 && (
        <h2 className={style.payTitle}>Товары в пути</h2>
      )}
      <div className={`${bestList.bestList} ${bestStyle.bestList}`}>
        {data?.data?.complitePdoduct.map((item: IProductPayItem) => (
          <div className={styleCart.item} key={item.id}>
            <Product
              item={item}
              category={category}
              pay={false}
              path="shop/"
              grade={gradeStar && gradeStar}
            />
            <div className={styleCart.text}>Товар в пути</div>
          </div>
        ))}
      </div>
      {data?.data?.develery.length !== 0 && (
        <h2 className={style.payTitle}>Доставленные товары</h2>
      )}
      <div className={`${bestList.bestList} ${bestStyle.bestList}`}>
        {data?.data?.develery.map((item: IProductPayItem) => (
          <div className={styleCart.item} key={item.id}>
            <Product
              item={item}
              category={category}
              pay={false}
              path="shop/"
              grade={gradeStar && gradeStar}
            />
            <div className={styleCart.text}>Доставлен</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductPayList
