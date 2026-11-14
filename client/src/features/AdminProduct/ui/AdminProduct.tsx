"use client"
import Like from "@/shared/like/ui/Like"
import Image from "next/image"
import style from "@/entities/Product/ui/Product.module.css"
import { FC, useState } from "react"
import styless from "./AdminProduct.module.css"
import { deleteGrade, deleteProduct, updateProduct } from "../api/api"
import { inputSecurity } from "@/security"
import Button from "@/shared/ui/Button"
import GradeStar from "@/shared/Star/GradeStar"
import UseGetStar from "@/shared/Hookcs/UseGetStar"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Iproduct, Star } from "@/shared/types/types"
import { useDispatch, useSelector } from "react-redux"
import { getProductId, getWindow } from "@/shared/reducers/FormSlice"

const AdminProduct: FC<{
  item: Iproduct
  dataArr: Iproduct[]
  setDataArr: any
  grade: Star[]
}> = ({ item, dataArr, setDataArr, grade }) => {
  //
  //
  const [name, setName] = useState(item.name)
  const [price, setPrice] = useState(item.price)
  const [state, setState] = useState(0)
  const pathName = usePathname()
  //
  const category = pathName?.replace("/adminPanel/", "")
  //
  const url = `/shop/${category}/${item.name}?productID=${item.id}`
  UseGetStar(grade, setState, item)
  const dispatch = useDispatch()
  //
  //
  return (
    <>
      <div className={style.bestItem} key={item.id}>
        <Image
          className={styless.close}
          src={`/close.svg`}
          alt="close"
          width={20}
          height={20}
          onClick={() => handleDelete(item.id, item)}
        />
        <Link href={url}></Link>
        <div className={style.wrapper}>
          <Link href={url}>
            <Image
              src={`/product/${item.imageUrl}`}
              alt={item.imageUrl}
              width={200}
              height={200}
              placeholder="blur"
              blurDataURL="/load.png"
            />
          </Link>
          <Like item={item} />
          <div className={style.weight}>{`${item.weight} г.`}</div>
        </div>
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(inputSecurity(e.target.value))
            }}
          />
          <input
            type="number"
            defaultValue={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <div className={styless.button}>
            <Button handleClick={() => handleClick(item.id, name, price)}>
              Редактировать
            </Button>
          </div>
        </div>
        <GradeStar grade={state} productId={item.id} clicked={false} />
        <Button handleClick={() => getImage(item.id)}>Изменить картинку</Button>
      </div>
    </>
  )
  async function handleClick(id: number, name: string, price: string) {
    await updateProduct(id, name, price)
  }
  async function handleDelete(id: number, item: Iproduct) {
    await deleteGrade(id)
    await deleteProduct(id)
    const filterArr = dataArr.filter((item: Iproduct) => item.id !== id)
    setDataArr(filterArr)
  }
  async function getImage(id: any) {
    dispatch(getWindow("imageList"))
    dispatch(getProductId(id))
  }
}

export default AdminProduct
