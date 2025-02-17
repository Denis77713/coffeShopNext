import { Item } from "@/entities/Product/ui/ProductType"
import Form from "@/shared/Form/ui/Form"
import Image from "next/image"
import style from "./CartForm.module.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRenderCart } from "@/shared/Form/ui/FormSlice"
import Button from "@/shared/ui/Button"

const CartForm = () => {
  const storage = localStorage.getItem("cart")
  const [dataStorage, setDataStorage] = useState(
    storage ? JSON.parse(storage) : null
  )
  const renderCart = useSelector((store: any) => store.FormSlice.renderCart)
  const dispatch = useDispatch()
  const [sum, setSum] = useState(0)
  let data = 0
  useEffect(() => {
    setDataStorage(storage ? JSON.parse(storage) : null)
    if (dataStorage) {
      setSum(
        dataStorage
          .map((item: Item) => Number(item.price))
          .reduce((acc: any, number: number) => acc + number, 0)
      )
    }
  }, [renderCart])

  return (
    <Form>
      <div className={style.productWrapper}>
        {dataStorage?.map((item: Item) => (
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
                <Image src={`/close.svg`} alt="cart" width={20} height={20} />
              </div>
            </div>
          </div>
        ))}
        <div className={style.pay}>
          <div className={style.sum}>{`Сумма покупки: ${sum}`}</div>
          <Button handleClick={(e: any) => handleClick(e)}>Купить</Button>
        </div>
      </div>
    </Form>
  )
  function handleClick(e: any) {
    e.preventDefault()
  }
  function deleteProduct(id: number) {
    const newData = dataStorage.filter((item: Item) => item.id !== id)
    setDataStorage(newData)
    localStorage.removeItem("cart")
    localStorage.setItem("cart", JSON.stringify(newData))
    dispatch(getRenderCart(!renderCart))
  }
}

export default CartForm
