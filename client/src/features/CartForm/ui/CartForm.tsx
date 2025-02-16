import { Item } from "@/entities/Product/ui/ProductType"
import Form from "@/shared/Form/ui/Form"
import Image from "next/image"
import style from "./CartForm.module.css"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getRenderCart } from "@/shared/Form/ui/FormSlice"

const CartForm = () => {
  const storage = localStorage.getItem("cart")
  const [dataStorage, setDataStorage] = useState(
    storage ? JSON.parse(storage) : null
  )
  const renderCart = useSelector((store: any) => store.FormSlice.renderCart)
  const dispatch = useDispatch()

  useEffect(() => {
    setDataStorage(storage ? JSON.parse(storage) : null)
  }, [renderCart])

  return (
    <Form>
      <div className={style.productWrapper}>
        {dataStorage?.map((item: Item) => (
          <div className={style.product} key={item.id}>
            <Image
              src={`/product/${item.imageUrl}.png`}
              alt="cart"
              width={80}
              height={80}
            />
            <p>{item.name}</p>
            <p>{item.price}</p>
            <div onClick={() => deleteProduct(item.id)}>
              <Image src={`/close.svg`} alt="cart" width={20} height={20} />
            </div>
          </div>
        ))}
      </div>
    </Form>
  )
  function deleteProduct(id: number) {
    const newData = dataStorage.filter((item: Item) => item.id !== id)
    setDataStorage(newData)
    localStorage.removeItem("cart")
    localStorage.setItem("cart", JSON.stringify(newData))
    dispatch(getRenderCart(!renderCart))
  }
}

export default CartForm
