"use client"

import IsLogin from "@/shared/Hookcs/IsLogin"
import {
  IDataProductPay,
  Iproduct,
  Star,
  TypeCategory,
  TypeProductPay,
} from "@/shared/types/types"
import { AxiosResponse } from "axios"
import { FC, useEffect, useState } from "react"

import styleCart from "../../../widges/AccountProductList/ui/AccountProductList.module.css"
import bestList from "../../ProductList/ui/ProductList.module.css"
import bestStyle from "../../BestProductList/ui/BestProductList.module.css"
import { getProcuctAccount } from "@/widges/AccountProductList/api/api"
import Product from "@/entities/Product/ui/Product"
import style from "@/pages/account/ui/Account.module.css"
import GetProductPay from "@/shared/Hookcs/getProductPay"
import QrCodeCart from "@/features/QrCodeCart/ui/QrCodeCart"
import { useDispatch, useSelector } from "react-redux"
import Button from "@/shared/ui/Button"
import { getWindow } from "@/shared/reducers/FormSlice"

const PathProductList: FC<{
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

  const [prductPay, setProductPay] = useState<TypeProductPay[]>([])
  GetProductPay(setProductPay, "Delivered", data?.data?.complitePdoduct)
  const formVisible = useSelector((store: any) => store.FormSlice.window)
  const dispatch = useDispatch()
  return (
    <>
      <div className={visible ? `container` : `${style.dnone}`}>
        {data?.data?.develery.length !== 0 && (
          <>
            <h2 className={style.payTitle}>Доставленные товары</h2>
            <Button handleClick={() => dispatch(getWindow("qrcode"))}>
              Показать QR код
            </Button>
          </>
        )}
        <div className={`${bestList.bestList} ${bestStyle.bestList}`}>
          {data?.data?.develery.map((item: Iproduct) => (
            <div className={styleCart.item} key={item.id}>
              <Product
                item={item}
                category={category}
                pay={false}
                path="shop/"
                grade={gradeStar && gradeStar}
                prductPay={prductPay}
              />
              <div className={styleCart.text}>Доставлен</div>
            </div>
          ))}
        </div>
      </div>
      <QrCodeCart />
    </>
  )
}

export default PathProductList
