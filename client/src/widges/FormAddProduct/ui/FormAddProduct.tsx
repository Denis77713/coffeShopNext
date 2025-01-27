"use client"

import { createProduct } from "../api/actions"
import styles from "./FormAddProduct.module.css"
import inputStyle from "../../../features/Search/ui/Search.module.css"
import { useState } from "react"
import Select from "@/features/Select/ui/Select"
import { inputSecurity } from "@/security"
import Button from "@/shared/ui/Button"
import Form from "@/shared/Form/ui/Form"
import { useDispatch, useSelector } from "react-redux"
import { getWindow } from "@/shared/Form/ui/FormSlice"
const FormAddProduct = () => {
  // const [formVisible, setFormVisible] = useState<null|string>(null)
  const [weight, setWeight] = useState(10)
  const [best, setBest] = useState("false")
  const [inputName, setInputName] = useState("")
  const [inputNum, setInputNum] = useState("")
  const dispatch = useDispatch()
  const formVisible = useSelector((store: any) => store.FormSlice.window)
  



  return (
    <>
      {formVisible ==='addProduct'? (
        <Form >
          <input
            className={inputStyle.input}
            type="text"
            placeholder="Название товара"
            value={inputName}
            onChange={(e) => {
              setInputName(inputSecurity(e.target.value))
            }}
          />
          <input
            className={inputStyle.input}
            type="number"
            placeholder="Стоимость товара"
            defaultValue={inputNum}
            onChange={(e) => setInputNum(e.target.value)}
          />
          <div className={styles.selectList}>
            <label htmlFor="">Выберите грамовки</label>

            <Select
              state={weight}
              setState={setWeight}
              valueOne={"250"}
              valueTwo={"10"}
              textOne={"250"}
              textTwo={"10"}
            />
            <label htmlFor="">Добавить в лучшие товары?</label>
            <Select
              state={best}
              setState={setBest}
              valueOne={false}
              valueTwo={true}
              textOne={"Нет"}
              textTwo={"Да"}
            />
          </div>
          <Button
            handleClick={() => handleClick(weight, best, inputName, inputNum)}
          >
            Добавить
          </Button>
        </Form>
      ) : (
        <div className={styles.buttonPosition}>
          <Button handleClick={() => dispatch(getWindow("addProduct"))}>
            Добавить товар
          </Button>
        </div>
      )}
    </>
  )

  function closeClick() {
    setInputName("")
    setInputNum("")
  }

  async function handleClick(
    weight: number,
    best: string,
    inputName: string,
    inputNum: string
  ) {
    await createProduct(weight, best, inputName, inputNum)
  }
}

export default FormAddProduct
