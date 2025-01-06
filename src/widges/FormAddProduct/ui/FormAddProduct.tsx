"use client"

import { createProduct } from "../api/actions"
import styles from "./FormAddProduct.module.css"
import inputStyle from "../../../features/Search/ui/Search.module.css"
import { useState } from "react"
import Select from "@/features/Select/ui/Select"
import Image from "next/image"
import { inputSecurity } from "@/security"
import Button from "@/shared/ui/Button"
const FormAddProduct = () => {
  const [formVisible, setFormVisible] = useState(false)
  const [weight, setWeight] = useState(10)
  const [best, setBest] = useState("false")
  const [inputName, setInputName] = useState("")
  const [inputNum, setInputNum] = useState("")

  return (
    <>
      {formVisible ? (
        <div className={styles.wrapper}>
          <form className={styles.formProduct}>
            <Image
              className={styles.close}
              src={"/close.svg"}
              alt="close"
              width={30}
              height={30}
              onClick={() => closeClick()}
            />
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

              <Select state={weight} setState={setWeight}
                valueOne={"250"} valueTwo={"10"}
                textOne={"250"} textTwo={"10"}
              />
              <label htmlFor="">Добавить в лучшие товары?</label>
              <Select state={best} setState={setBest}
                valueOne={false} valueTwo={true}
                textOne={"Нет"} textTwo={"Да"}
              />
            </div>
            <Button handleClick = {() => handleClick(weight, best, inputName, inputNum)}>Добавить</Button>
          </form>
        </div>
      ) : (
        <div className= {styles.buttonPosition}>
          <Button handleClick = {() => setFormVisible(true)}>Добавить товар</Button>
        </div>
      )}
    </>
  )

  function closeClick() {
    setFormVisible(false)
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
