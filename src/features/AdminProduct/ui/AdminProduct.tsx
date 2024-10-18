'use client'
import Like from "@/shared/like/ui/Like"
import Image from "next/image"
import style from "@/entities/Product/ui/Product.module.css"
import { FC, useState } from "react"
import { Item } from "@/entities/Product/ui/ProductType"
import styles from '@/widges/FormAddProduct/ui/FormAddProduct.module.css'
import styless from './AdminProduct.module.css'
import { deleteProduct, updateProduct } from "../api/api"

const AdminProduct: FC<{ item: Item, dataArr:Item[],setDataArr:any }> = ({ item,dataArr,setDataArr }) => {
  
  const [name, setName] = useState(item.name)
  const [price, setPrice] = useState(item.price)
console.log(item)
  return (
    <div className={style.bestItem} key={item.id} >
      <Image className={styless.close} src = {`/close.svg`}
       alt="close" width={20} height={20} onClick={()=>handleDelete(item.id)}/>
      <div className={style.wrapper}>
        <Image
          src={`/product/${item.imageUrl}.png`}
          alt={item.imageUrl}
          width={200}
          height={200}
          placeholder="blur"
          blurDataURL="/load.png"
        />
        <Like item={item} />
        <div className={style.weight}>{`${item.weight} г.`}</div>
      </div>
      <div>
      <input type="text" defaultValue={name} onChange={(e)=>setName(e.target.value)}/>
      <input type="number" defaultValue={price} onChange={(e)=>setPrice(e.target.value)}/>
      <button className={`${styles.formButton} ${styless.button}`}
      onClick={()=> handleClick(item.id,name,price) }
      >
        Редактировать
        </button>
      </div>
    </div>
  )
  async function handleClick(item : number, name : string, price : string){
   await updateProduct(item,name,price)
  }
  async function handleDelete(id:number){
    await deleteProduct(id)
    const filterArr = dataArr.filter((item:Item) => item.id !== id)
    setDataArr(filterArr)
  }
}

export default AdminProduct