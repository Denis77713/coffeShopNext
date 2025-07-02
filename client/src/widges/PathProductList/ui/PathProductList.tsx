"use client"

import {
  Iproduct,
  ListProductPay,
  Star,
  TypeCategory,
  typeProp,
} from "@/shared/types/types"
import { FC, use, useEffect } from "react"

import styleCart from "../../../widges/AccountProductList/ui/AccountProductList.module.css"
import bestList from "../../ProductList/ui/ProductList.module.css"
import bestStyle from "../../BestProductList/ui/BestProductList.module.css"
import Product from "@/entities/Product/ui/Product"
import QrCodeCart from "@/features/QrCodeCart/ui/QrCodeCart"
import { useDispatch, useSelector } from "react-redux"
import Button from "@/shared/ui/Button"
import { getWindow } from "@/shared/reducers/FormSlice"
import { getListPayProductAccount } from "@/shared/functions/functions"
import { AxiosResponse } from "axios"

const PathProductList: FC<{ prop: typeProp }> = ({ prop }) => {
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
  const filterPrductPay = getListPayProductAccount(prductPay, "Delivered")
  const dispatch = useDispatch()
  //
  //
  useEffect(() => {
    seTest(data)
  }, [])
  //
  //c
  return (
    <>
      <div className={`container`}>
        {test.length !== 0 && (
          <>
            <Button handleClick={() => dispatch(getWindow("qrcode"))}>
              Показать QR код
            </Button>
          </>
        )}
        <div className={`${bestList.bestList} ${bestStyle.bestList}`}>
          {test.length !== 0 &&
            data?.data?.develery?.map((item: Iproduct) => (
              <div className={styleCart.item} key={item.id}>
                <Product
                  item={item}
                  category={category?.data}
                  pay={false}
                  path="shop/"
                  grade={gradeStar?.data}
                  prductPay={filterPrductPay}
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
