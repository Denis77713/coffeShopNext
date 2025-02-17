import Form from "@/shared/Form/ui/Form"
import Image from "next/image"
import style from "./CartForm.module.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRenderCart } from "@/shared/Form/ui/FormSlice"
import Button from "@/shared/ui/Button"
import { getCartPay } from "../api/api"

export interface IProductCart {
  id: number
  imageUrl: string
  price: string
  name: string
  number: number
}

const CartForm = () => {
  const storage: string | null = localStorage.getItem("cart")
  const [dataStorage, setDataStorage] = useState<IProductCart[]>(
    storage ? JSON.parse(storage) : null
  )
  const renderCart = useSelector((store: any) => store.FormSlice.renderCart)
  const dispatch = useDispatch()
  const [sum, setSum] = useState(0)
  const [complitePay, setComplitePay] = useState(null)

  //
  useEffect(() => {
    setDataStorage(storage ? JSON.parse(storage) : null)
    console.log(dataStorage)
    if (dataStorage) {
      setSum(
        dataStorage
          .map((item: IProductCart) => Number(item.price))
          .reduce((acc: any, number: number) => acc + number, 0)
      )
    }
  }, [renderCart])

  return (
    <>
      {complitePay ? (
        <Form>
          <div className={style.paygreen}>Оплата прошла успешно!</div>
        </Form>
      ) : (
        <Form>
          <div className={style.productWrapper}>
            {dataStorage?.map((item: IProductCart) => (
              <div className={style.product} key={item.id}>
                <div className={style.wrapperImgName}>
                  <Image
                    src={`/product/${item.imageUrl}.png`}
                    alt="cart"
                    width={80}
                    height={80}
                  />
                  <p>{item.name}</p>
                </div>
                <div className={style.wrapperPrise}>
                  <p className={style.wrapperPrise__Prise}>{item.price}</p>
                  <div
                    className={style.pointer}
                    onClick={() => deleteProduct(item.id)}
                  >
                    <Image
                      src={`/close.svg`}
                      alt="cart"
                      width={20}
                      height={20}
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className={style.pay}>
              <div className={style.sum}>{`Сумма покупки: ${sum}`}</div>
              <Button
                handleClick={async (e: any) =>
                  await getCartPay(e, dataStorage, sum, setComplitePay)
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
    const newData = dataStorage.filter((item: IProductCart) => item.id !== id)
    setDataStorage(newData)
    localStorage.removeItem("cart")
    localStorage.setItem("cart", JSON.stringify(newData))
    dispatch(getRenderCart(!renderCart))
  }
}

export default CartForm
