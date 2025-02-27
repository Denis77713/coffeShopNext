"use client"

import Product from "@/entities/Product/ui/Product"
import { getProcuctAccount } from "@/widges/AccountProductList/api/api"
import {
  IDataProductPay,
  IProductPayItem,
} from "@/widges/AccountProductList/ui/AccountProductList"
import { TypeCategory } from "@/widges/ProductList/ui/ProductList"
import { AxiosResponse } from "axios"
import { FC, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import styleCart from "../../../widges/AccountProductList/ui/AccountProductList.module.css"
import style from "./ProductPayList.module.css"
import bestList from "../../ProductList/ui/ProductList.module.css"
import bestStyle from "../../BestProductList/ui/BestProductList.module.css"

const ProductPayList: FC<{ category: TypeCategory[] }> = ({ category }) => {
  const Auth = useSelector((store: any) => store.FormSlice.Auth)
  const [visible, setVisible] = useState(false)
  const [data, setData] = useState<
    null | IDataProductPay | AxiosResponse<null, IDataProductPay>
  >(null)

  useEffect(() => {
    async function Login() {
      if (Auth === 200) {
        const data = await getProcuctAccount()
        setData(data)
        setVisible(
          data?.data?.complitePdoduct.length !== 0 ||
            data?.data?.develery.length !== 0
        )
      }
    }
    Login()
  }, [Auth])
  return (
    <div className={visible ? `container` : `${style.dnone}`}>
      {data?.data?.complitePdoduct.length !== 0 && (
        <h2 className={style.payTitle}>Товары в пути</h2>
      )}
      <div className={`${bestList.bestList} ${bestStyle.bestList}`}>
        {data?.data?.complitePdoduct.map((item: IProductPayItem) => (
          <div className={styleCart.item} key={item.id}>
            <Product item={item} category={category} pay={false} />
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
            <Product item={item} category={category} pay={false} />
            <div className={styleCart.text}>Доставлен</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductPayList
