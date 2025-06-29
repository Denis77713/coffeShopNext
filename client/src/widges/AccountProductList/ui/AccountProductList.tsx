"use client"

import { FC, use, useState } from "react"
import { getProcuctAccount } from "../api/api"
import { AxiosResponse } from "axios"
import Product from "@/entities/Product/ui/Product"
import CarouselSlider from "@/entities/CarouselSlider/ui/CarouselSlider"
import style from "./AccountProductList.module.css"

import IsLogin from "@/shared/Hookcs/IsLogin"
import {
  IDataProductPay,
  Iproduct,
  IProductPay,
  Star,
  TypeCategory,
  TypeProductPay,
} from "@/shared/types/types"
import GetProductPay from "@/shared/Hookcs/getProductPay"

const AccountProductList: FC<{
  promise: any
  category: TypeCategory[]
  gradeStar: Star[]
}> = ({ promise, category, gradeStar }) => {
  const res: any = use(promise)
  const data: any = res?.data?.userProduct
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
  const [prductPay, setProductPay] = useState<TypeProductPay[]>([])
  GetProductPay(setProductPay, "Получен", data)
  return (
    <div>
      {data && (
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
      )}
    </div>
  )
}

export default AccountProductList
