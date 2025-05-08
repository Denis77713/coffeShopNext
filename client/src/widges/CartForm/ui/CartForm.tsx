import Form from "@/shared/Form/ui/Form"
import Image from "next/image"
import style from "./CartForm.module.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRenderCart } from "@/shared/reducers/FormSlice"
import Button from "@/shared/ui/Button"
import { getCartPay } from "../api/api"
import CartFormItem from "@/entities/CartFormItem/ui/CartFormItem"
import { Iproduct, IProductCartStore } from "@/shared/types/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const CartForm = ({ setCart }: any) => {
  const storage: string | null = localStorage.getItem("cart")
  const [dataStorage, setDataStorage] = useState<IProductCartStore[]>(
    storage ? JSON.parse(storage) : null
  )
  const renderCart = useSelector((store: any) => store.FormSlice.renderCart)
  const dispatch = useDispatch()
  const [sum, setSum] = useState(
    dataStorage &&
      dataStorage
        .map(
          (item: IProductCartStore) => Number(item.price) * item.numProductsPay
        )
        .reduce((acc: any, number: number) => acc + number, 0)
  )

  const [complitePay, setComplitePay] = useState(null)
  const [render, setRender] = useState(false)
  const [dataPay, setDataPay] = useState<any>(null)
  const searchParams: any = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()
  useEffect(() => {
    if (dataPay) {
      const params = new URLSearchParams(searchParams)
      if (dataPay) {
        params.set("payIdProduct", dataPay.id)
      } else {
        params.delete("payIdProduct")
      }
      replace(`${pathName}?${params.toString()}`)
    }
  }, [dataPay])
  //
  //
  useEffect(() => {
    setDataStorage(storage ? JSON.parse(storage) : null)
    const tesuInUndefinded = dataStorage
      .map((item) => item.numProductsPay)
      .filter((item) => item === undefined)
    if (dataStorage && tesuInUndefinded.length === 0) {
      setSum(
        dataStorage
          .map(
            (item: IProductCartStore) =>
              Number(item.price) * item.numProductsPay
          )
          .reduce((acc: any, number: number) => acc + number, 0)
      )
    }
  }, [renderCart, render])

  useEffect(() => {
    if (complitePay) {
      localStorage.removeItem("cart")
      setSum(0)
      setDataStorage(storage ? JSON.parse(storage) : null)
      setCart(null)
    }
  }, [complitePay])
  return (
    <>
      {complitePay ? (
        <Form>
          <div className={style.paygreen}>Оплата прошла успешно!</div>
        </Form>
      ) : (
        <Form>
          <div className={style.productWrapper}>
            {dataStorage?.map((item: IProductCartStore) => (
              <CartFormItem
                key={item.id}
                item={item}
                deleteProduct={deleteProduct}
                render={render}
                setRender={setRender}
              />
            ))}
            <div className={style.pay}>
              <div className={style.sum}>{`Сумма покупки: ${sum}`}</div>
              <Button
                handleClick={async (e: any) =>
                  setDataPay(
                    await getCartPay(e, dataStorage, sum, setComplitePay)
                  )
                }
              >
                Купить
              </Button>
            </div>
          </div>
        </Form>
      )}
    </>
  )

  function deleteProduct(id: number) {
    const newData = dataStorage.filter(
      (item: IProductCartStore) => item.id !== id
    )
    setDataStorage(newData)
    localStorage.removeItem("cart")
    localStorage.setItem("cart", JSON.stringify(newData))
    dispatch(getRenderCart(!renderCart))
  }
}

export default CartForm
