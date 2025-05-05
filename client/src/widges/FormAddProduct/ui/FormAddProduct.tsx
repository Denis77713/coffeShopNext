"use client"

import { createProduct } from "../api/actions"
import styles from "./FormAddProduct.module.css"
import inputStyle from "../../../features/Search/ui/Search.module.css"
import { FC, useEffect, useState } from "react"
import Select from "@/features/Select/ui/Select"
import { inputSecurity } from "@/security"
import Button from "@/shared/ui/Button"
import Form from "@/shared/Form/ui/Form"
import { useDispatch, useSelector } from "react-redux"
import { getWindow } from "@/shared/reducers/FormSlice"
import { api } from "@/widges/header/api/api"
import axios from "axios"
import { IParams } from "@/pages/shop/ui/ShopPage"
import { fileType } from "@/shared/types/types"
const FormAddProduct: FC<{ params: IParams }> = ({ params }) => {
  const [weight, setWeight] = useState(10)
  const [best, setBest] = useState("false")
  const [inputName, setInputName] = useState("")
  const [inputNum, setInputNum] = useState("")
  const dispatch = useDispatch()
  const formVisible = useSelector((store: any) => store.FormSlice.window)
  //
  //
  useEffect(() => {
    setInputName("")
    setInputNum("")
  }, [formVisible])
  //
  const [file, setFile] = useState<null | fileType | any>(null)
  //
  async function loadFile(e: any) {
    setFile(e.target.files[0])
  }
  //

  return (
    <>
      {formVisible === "addProduct" ? (
        <Form>
          <input
            type="file"
            onChange={(e) => loadFile(e)}
            accept="image/*, .png,.jpg"
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
            handleClick={(e: any) =>
              handleClick(e, weight, best, inputName, inputNum)
            }
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
    e: any,
    weight: number,
    best: string,
    inputName: string,
    inputNum: string
  ) {
    e.preventDefault()
    if (file !== null) {
      const formData = new FormData()
      formData.append("file", file)
      // const index = file.name.indexOf(".")
      // const newImg = file.name.slice(0, index)
      await createProduct(weight, best, inputName, inputNum, file.name)
      const result = await api.post("/upload", formData)
    }
  }
}

export default FormAddProduct
