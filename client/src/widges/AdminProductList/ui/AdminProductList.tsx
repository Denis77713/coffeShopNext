"use client"

import AdminProduct from "@/features/AdminProduct/ui/AdminProduct"
import { FC, useEffect, useState } from "react"
import style from "@/widges/ProductList/ui/ProductList.module.css"
import styles from "./AdminProductList.module.css"
import UseGetGrade from "@/shared/Hookcs/UseGetGrade"
import { Iproduct } from "@/shared/types/types"
import { useSelector } from "react-redux"

const AdminProductList: FC<{ data: any }> = ({ data }) => {
  const [dataArr, setDataArr] = useState(data)
  const [grade, setGrade] = useState([])

  const renderCart = useSelector((store: any) => store.FormSlice.renderCart)

  useEffect(() => {
    setDataArr(data)
  }, [data, renderCart])
  UseGetGrade(setGrade, dataArr)
  return (
    <div className={`${style.bestList} ${styles.container}`}>
      {dataArr.map((item: Iproduct) => (
        <AdminProduct
          key={item.id}
          item={item}
          dataArr={dataArr}
          setDataArr={setDataArr}
          grade={grade && grade}
        />
      ))}
    </div>
  )
}

export default AdminProductList
