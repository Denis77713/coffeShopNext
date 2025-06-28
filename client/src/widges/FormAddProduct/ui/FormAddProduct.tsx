"use client"

import { createProduct, getCategory, getSecondCategory } from "../api/actions"
import styles from "./FormAddProduct.module.css"
import inputStyle from "../../../features/Search/ui/Search.module.css"
import { FC, useEffect, useState } from "react"
import Select from "@/features/Select/ui/Select"
import { inputSecurity } from "@/security"
import Button from "@/shared/ui/Button"
import Form from "@/shared/Form/ui/Form"
import { useDispatch, useSelector } from "react-redux"
import { getRenderCart, getWindow } from "@/shared/reducers/FormSlice"
import { api } from "@/widges/header/api/api"
import { IParams } from "@/pages/shop/ui/ShopPage"
import { fileType } from "@/shared/types/types"
//
//
type IsecondCategory = {
  id: number
  name: string
  text: string
}
//
const FormAddProduct: FC<{ params: any }> = ({ params }) => {
  const [weight, setWeight] = useState(10)
  const [best, setBest] = useState("false")
  const [inputName, setInputName] = useState("")
  const [inputNum, setInputNum] = useState("")
  const [secondCategory, setSecondCategory] = useState<
    IsecondCategory[] | null
  >(null)
  const [secCat, setSecCat] = useState<null | string>(null)
  const dispatch = useDispatch()
  const formVisible = useSelector((store: any) => store.FormSlice.window)
  //
  //
  const renderCart = useSelector((store: any) => store.FormSlice.renderCart)

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
  //
  useEffect(() => {
    async function get() {
      const categoryId = await getCategory(params.id)
      if (categoryId?.category === "Cafe") {
        const result = await getSecondCategory()
        setSecondCategory(result)
        setSecCat(String(result[0].id))
      }
    }
    // if (params.id === "cafeCoffe") {
    get()
    // }
  }, [formVisible])
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
            {secondCategory && (
              <select onChange={(e) => setSecCat(e.target.value)}>
                {secondCategory.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.text}
                  </option>
                ))}
              </select>
            )}
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
    dispatch(getWindow(""))
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
      const categoryId = await getCategory(params.id)
      await createProduct(
        categoryId,
        weight,
        best,
        inputName,
        inputNum,
        file.name,
        secCat
      )
      const result = await api.post("/upload", formData)
      closeClick()
      dispatch(getRenderCart(!renderCart))
    }
  }
}

export default FormAddProduct
