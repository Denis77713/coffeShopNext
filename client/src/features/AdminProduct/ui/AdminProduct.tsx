"use client"
import Like from "@/shared/like/ui/Like"
import Image from "next/image"
import style from "@/entities/Product/ui/Product.module.css"
import { FC, useEffect, useState } from "react"
import { Item } from "@/entities/Product/ui/ProductType"
import styless from "./AdminProduct.module.css"
import { deleteProduct, updateProduct } from "../api/api"
import { inputSecurity } from "@/security"
import Button from "@/shared/ui/Button"
import GradeStar from "@/shared/Star/GradeStar"
import UseGetStar from "@/shared/Hookcs/UseGetStar"
import { Star } from "@/entities/Product/ui/Product"
import { usePathname } from "next/navigation"
import Link from "next/link"

const AdminProduct: FC<{
  item: Item
  dataArr: Item[]
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
  return (
    <div className={style.bestItem} key={item.id}>
      <Link href={url}>
        <Image
          className={styless.close}
          src={`/close.svg`}
          alt="close"
          width={20}
          height={20}
          onClick={() => handleDelete(item.id)}
        />
      </Link>
      <div className={style.wrapper}>
        <Link href={url}>
          <Image
            src={`/product/${item.imageUrl}.png`}
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
    </div>
  )
  async function handleClick(item: number, name: string, price: string) {
    await updateProduct(item, name, price)
  }
  async function handleDelete(id: number) {
    await deleteProduct(id)
    const filterArr = dataArr.filter((item: Item) => item.id !== id)
    setDataArr(filterArr)
  }
}

export default AdminProduct
