"use client"

import { FC, useState } from "react"
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
  category: TypeCategory[]
  gradeStar: Star[]
}> = ({ category, gradeStar }) => {
  const [state, setState] = useState<
    null | IDataProductPay | AxiosResponse<null, IDataProductPay>
  >(null)

  IsLogin(setState, getProcuctAccount)

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
  GetProductPay(setProductPay, "Получен", state?.data?.userProduct)
  return (
    <div>
      {state?.data && (
        <div>
          <h2 className={style.title}>История заказов</h2>
          <CarouselSlider responsive={responsive}>
            {state?.data?.userProduct.map((item: Iproduct) => (
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
