import Form from "@/shared/Form/ui/Form"
import Image from "next/image"
import style from "./CartForm.module.css"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRenderCart } from "@/shared/reducers/FormSlice"
import Button from "@/shared/ui/Button"
import { getCartPay } from "../api/api"
import CartFormItem from "@/entities/CartFormItem/ui/CartFormItem"
import { IProductCartStore, newDataManagerItem } from "@/shared/types/types"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import { apiServer } from "@/widges/header/api/api"
import Scklad from "@/entities/Scklad/ui/Scklad"

const CartForm = ({ setCart }: any) => {
  const User = useSelector((store: any) => store.FormSlice.User)

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
  const [render, setRender] = useState<boolean>(false)
  const [dataPay, setDataPay] = useState<newDataManagerItem[] | null>(null)
  const searchParams: any = useSearchParams()
  const pathName = usePathname()
  const [scklad, setScklad] = useState<newDataManagerItem[] | null>(null)
  const { replace } = useRouter()
  //
  //
  //
  useEffect(() => {
    if (dataPay) {
      const newDataPay = dataPay
        .map((item: any) => item.sum)
        .reduce((acc: any, val: any, i: any, arr: any) => {
          return acc + val
        }, 0)
      const params = new URLSearchParams(searchParams)
      if (dataPay) {
        params.set("payIdProduct", newDataPay)
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
  const ref = useRef<any>()
  const doc = new jsPDF()
  return (
    <>
      {complitePay ? (
        <Form>
          <div className={style.paygreen}>Оплата прошла успешно!</div>
        </Form>
      ) : (
        <>
          <Form>
            <div ref={ref} className={style.productWrapper}>
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
                    await ButtonPayClick(e, dataStorage, sum, setComplitePay)
                  }
                >
                  Купить
                </Button>
              </div>
            </div>
          </Form>
        </>
      )}
      {scklad && <Scklad data={scklad} />}
    </>
  )
  async function ButtonPayClick(
    e: any,
    dataStorage: IProductCartStore[],
    sum: number,
    setComplitePay: any
  ) {
    const res = await getCartPay(e, dataStorage, sum, setComplitePay)
    setDataPay(res?.data)
    const productPayQrData = res?.data.filter(
      (item: newDataManagerItem) => Number(item.developId) === res.developId
    )
    setScklad(productPayQrData)
    await postPDF(doc)
  }

  function deleteProduct(id: number) {
    const newData = dataStorage.filter(
      (item: IProductCartStore) => item.id !== id
    )
    setDataStorage(newData)
    localStorage.removeItem("cart")
    localStorage.setItem("cart", JSON.stringify(newData))
    dispatch(getRenderCart(!renderCart))
  }
  async function postPDF(data: any) {
    const canvas = await html2canvas(ref.current)

    const imgData = canvas.toDataURL()
    // console.log(imgData)
    await apiServer.post("/postpdf", {
      imgData,
      mail: JSON.stringify(User.email),
    })
  }
}

export default CartForm
