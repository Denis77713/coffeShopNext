"use client"

import Product from "@/entities/Product/ui/Product"
import { FC, use, useEffect } from "react"
import styleCart from "../../../widges/AccountProductList/ui/AccountProductList.module.css"
import bestList from "../../ProductList/ui/ProductList.module.css"
import bestStyle from "../../BestProductList/ui/BestProductList.module.css"

import {
  Iproduct,
  ListProductPay,
  Star,
  TypeCategory,
  typeProp,
} from "@/shared/types/types"
import { getListPayProductAccount } from "@/shared/functions/functions"
import { AxiosResponse } from "axios"

const ProductPayList: FC<{ prop: typeProp }> = ({ prop }) => {
  //
  //
  const {
    dataPromise,
    categoryPromise,
    gradeStarPromise,
    prductPay,
    seTest,
    test,
  } = prop
  //
  //
  const data: AxiosResponse<ListProductPay, any> | undefined = use(dataPromise)
  const category: TypeCategory[] | any = use(categoryPromise)
  const gradeStar: Star[] | any = use(gradeStarPromise)
  const filterPrductPay = getListPayProductAccount(prductPay, "Успешный заказ")
  //
  //
  useEffect(() => {
    seTest(data)
  }, [])
  //
  //
  return (
    <div className={`container ${bestList.bestList} ${bestStyle.bestList}`}>
      {test &&
        data?.data?.complitePdoduct?.map((item: Iproduct) => (
          <div className={styleCart.item} key={item.id}>
            <Product
              item={item}
              category={category?.data}
              pay={false}
              path="shop/"
              grade={gradeStar?.data}
              prductPay={filterPrductPay}
            />
            <div className={styleCart.text}>Товар в пути</div>
          </div>
        ))}
    </div>
  )
}

export default ProductPayList
