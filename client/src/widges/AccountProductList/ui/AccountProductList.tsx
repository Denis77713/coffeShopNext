"use client"

import { Authorizasion } from "@/widges/header/api/api"
import { FC, useEffect, useState } from "react"
import { redirectAction } from "../../../pages/account/api/api"
import { getProcuctAccount } from "../api/api"
import { AxiosResponse } from "axios"
import Product from "@/entities/Product/ui/Product"
import { TypeCategory } from "@/widges/ProductList/ui/ProductList"
import Carousel from "react-multi-carousel"
import style from "./AccountProductList.module.css"

interface IProductPayItem {
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
interface IProductPay {
  userProduct: IProductPayItem[]
  complitePdoduct: IProductPayItem[]
  develery: IProductPayItem[]
}
interface IDataProductPay {
  data: IProductPay
}

const AccountProductList: FC<{ category: TypeCategory[] }> = ({ category }) => {
  const [state, setstate] = useState<
    null | IDataProductPay | AxiosResponse<null, IDataProductPay>
  >(null)
  //
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  }
  useEffect(() => {
    async function Login() {
      try {
        await Authorizasion()
        const data = await getProcuctAccount()
        setstate(data)
      } catch (e) {
        redirectAction("/")
      }
    }
    Login()
  }, [])
  console.log(state)
  return (
    <div>
      {state?.data && (
        <div>
          <h2>История</h2>
          <Carousel
            className={style.wrapper}
            responsive={responsive}
            infinite={true}
          >
            {state?.data?.userProduct.map((item: IProductPayItem) => (
              <div key={item.id}>
                <Product item={item} category={category} pay={false} />
              </div>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  )
}

export default AccountProductList
