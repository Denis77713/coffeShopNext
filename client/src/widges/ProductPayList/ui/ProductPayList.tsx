"use client"

import Product from "@/entities/Product/ui/Product"
import { FC, use, useEffect, useState } from "react"
import styleCart from "../../../widges/AccountProductList/ui/AccountProductList.module.css"
import bestList from "../../ProductList/ui/ProductList.module.css"
import bestStyle from "../../BestProductList/ui/BestProductList.module.css"

import {
  Iproduct,
  Star,
  TypeCategory,
  TypeDevelop,
  TypeGrade,
  TypeprductPay,
} from "@/shared/types/types"
import { AxiosResponse } from "axios"

type categoryType = {
  data: TypeCategory[]
}
type gradeType = {
  data: Star[]
}

const ProductPayList: FC<{
  dataPromise: any
  categoryPromise: Promise<AxiosResponse<categoryType, any> | undefined>
  gradeStarPromise: Promise<AxiosResponse<gradeType, any> | undefined>
  prductPay: TypeDevelop[] | null
  seTest: any
}> = ({
  dataPromise,
  categoryPromise,
  gradeStarPromise,
  prductPay,
  seTest,
}) => {
  //
  //
  const data: any = use(dataPromise)
  const category: any = use(categoryPromise)
  const gradeStar: any = use(gradeStarPromise)
  //
  //
  console.log(prductPay)
  useEffect(() => {
    seTest(data)
  }, [])
  //
  //
  return (
    <div className={`container ${bestList.bestList} ${bestStyle.bestList}`}>
      {data?.data.complitePdoduct.map((item: Iproduct) => (
        <div className={styleCart.item} key={item.id}>
          <Product
            item={item}
            category={category.data}
            pay={false}
            path="shop/"
            grade={gradeStar?.data}
            prductPay={prductPay}
          />
          <div className={styleCart.text}>Товар в пути</div>
        </div>
      ))}
    </div>
  )
}

export default ProductPayList
