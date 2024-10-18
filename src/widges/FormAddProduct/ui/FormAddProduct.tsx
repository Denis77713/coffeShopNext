"use client"

import { createProduct } from "../api/actions"
import styles from "./FormAddProduct.module.css"
import inputStyle from "../../../features/Search/ui/Search.module.css"
import { useState } from "react"
import Select from "@/features/Select/ui/Select"
import Image from "next/image"
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
              defaultValue={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
            <input
              className={inputStyle.input}
              type="number"
              placeholder="Стоимость товара"
              defaultValue={inputNum}
              onChange={(e) => setInputNum(e.target.value)}
            />
            <div>
              <Select state={weight} setState={setWeight}
                valueOne={"250"} valueTwo={"10"}
                textOne={"250"} textTwo={"10"}
              />

              <Select state={best} setState={setBest}
                valueOne={false} valueTwo={true}
                textOne={"Нет"} textTwo={"Да"}
              />
            </div>

            <button
              className={styles.formButton}
              onClick={() => handleClick(weight, best, inputName, inputNum)}
            >
              Добавить
            </button>
          </form>
        </div>
      ) : (
        <button
          className={styles.formButton}
          onClick={() => setFormVisible(true)}>Добавить товар</button>
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
