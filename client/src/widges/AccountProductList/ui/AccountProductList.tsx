"use client"

import { FC, use, useState } from "react"
import Product from "@/entities/Product/ui/Product"
import CarouselSlider from "@/entities/CarouselSlider/ui/CarouselSlider"
import style from "./AccountProductList.module.css"

import {
  Iproduct,
  Star,
  TypeCategory,
  TypeProductPay,
} from "@/shared/types/types"
import { TypeDevelop } from "@/pages/account/ui/Account"
//
//
const AccountProductList: FC<{
  promise: any
  category: TypeCategory[]
  gradeStar: Star[]
  prductPay: TypeDevelop[] | undefined
}> = ({ promise, category, gradeStar, prductPay }) => {
  //
  //
  let data = null
  //
  //
  console.log(data)
  if (typeof window !== "undefined") {
    const res: any = use(promise)
    data = res?.data?.userProduct
  }
  //
  //
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1000 },
      items: 3,
    },
    desktop: {
      breakpoint: { max: 1000, min: 540 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 540, min: 0 },
      items: 1,
    },
  }
  //
  //
  return (
    <>
      {category.length !== 0 && prductPay && (
        <div>
          <div>
            <CarouselSlider responsive={responsive}>
              {data.map((item: Iproduct) => (
                <div className={style.item} key={item.id}>
                  <Product
                    item={item}
                    category={category}
                    pay={false}
                    path="shop/"
                    isLike={false}
                    grade={gradeStar && gradeStar}
                    prductPay={prductPay}
                  />
                  <div className={style.text}>Оплачен</div>
                </div>
              ))}
            </CarouselSlider>
          </div>
        </div>
      )}
    </>
  )
}

export default AccountProductList
