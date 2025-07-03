"use client"

import { FC, use, useEffect, useState } from "react"
import Product from "@/entities/Product/ui/Product"
import CarouselSlider from "@/entities/CarouselSlider/ui/CarouselSlider"
import style from "./AccountProductList.module.css"

import {
  Iproduct,
  ListProductPay,
  Star,
  TypeCategory,
  TypeProductPay,
  typeProp,
} from "@/shared/types/types"
import { getListPayProductAccount } from "@/shared/functions/functions"
import { AxiosResponse } from "axios"
//
//
const AccountProductList: FC<{ prop: typeProp }> = ({ prop }) => {
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

  const data: AxiosResponse<ListProductPay, any> | undefined = use(dataPromise)
  const category: TypeCategory[] | any = use(categoryPromise)
  const gradeStar: Star[] | any = use(gradeStarPromise)
  const filterPrductPay = getListPayProductAccount(prductPay, "Получен")
  //
  //
  useEffect(() => {
    seTest(data)
  }, [])
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
      {data && (
        <CarouselSlider responsive={responsive}>
          {test &&
            data?.data?.userProduct?.map((item: Iproduct) => (
              <div className={style.item} key={item.id}>
                <Product
                  item={item}
                  category={category?.data}
                  pay={false}
                  path="shop/"
                  isLike={false}
                  grade={gradeStar?.data}
                  prductPay={filterPrductPay}
                />
                <div className={style.text}>Оплачен</div>
              </div>
            ))}
        </CarouselSlider>
      )}
    </>
  )
}

export default AccountProductList
