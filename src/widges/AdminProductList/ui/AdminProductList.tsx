'use client'

import { Item } from "@/entities/Product/ui/ProductType"
import AdminProduct from "@/features/AdminProduct/ui/AdminProduct"
import { FC, useEffect, useState } from "react"
import style from "@/widges/ProductList/ui/ProductList.module.css"
import styles from './AdminProductList.module.css'

const AdminProductList: FC<{ data: Item[] }> = ({ data }) => {
  
const [dataArr, setDataArr] = useState(data) 

useEffect(() => {
  setDataArr(data)
}, [data]);

  return (
    <div className={`${style.bestList} ${styles.container}`}>
      {dataArr.map((item) => (
        <AdminProduct key={item.id} item={item} dataArr = {dataArr} setDataArr={setDataArr} />
      ))}
    </div>
  )
}

export default AdminProductList
