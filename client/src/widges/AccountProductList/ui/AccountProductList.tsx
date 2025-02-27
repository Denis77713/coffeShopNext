"use client"

import { FC, useEffect, useState } from "react"
import { getProcuctAccount } from "../api/api"
import { AxiosResponse } from "axios"
import Product from "@/entities/Product/ui/Product"
import { TypeCategory } from "@/widges/ProductList/ui/ProductList"
import CarouselSlider from "@/entities/CarouselSlider/ui/CarouselSlider"
import style from "./AccountProductList.module.css"
import { useSelector } from "react-redux"
import IsLogin from "@/shared/Hookcs/IsLogin"

export interface IProductPayItem {
  id: number
  name: string
  imageUrl: string
  price: string
  best: string
  weight: string
  none: string
  drip: string
  number: number
  categoryId: number
}
export interface IProductPay {
  userProduct: IProductPayItem[]
  complitePdoduct: IProductPayItem[]
  develery: IProductPayItem[]
}
export interface IDataProductPay {
  data: IProductPay
}

const AccountProductList: FC<{ category: TypeCategory[] }> = ({ category }) => {
  const [state, setstate] = useState<
    null | IDataProductPay | AxiosResponse<null, IDataProductPay>
  >(null)
  //
  const Auth = useSelector((store: any) => store.FormSlice.Auth)
  useEffect(() => {
    async function Login() {
      if (Auth === 200) {
        const data = await getProcuctAccount()
        setstate(data)
      }
    }
    Login()
  }, [Auth])
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
  return (
    <div>
      {state?.data && (
        <div>
          <h2 className={style.title}>История заказов</h2>
          <CarouselSlider responsive={responsive}>
            {state?.data?.userProduct.map((item: IProductPayItem) => (
              <div className={style.item} key={item.id}>
                <Product item={item} category={category} pay={false} />
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
