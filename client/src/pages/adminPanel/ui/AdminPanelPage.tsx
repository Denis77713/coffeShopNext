"use client"

import CategoryList from "@/widges/CategoryList/ui/CategoryList"
import { getCategory } from "../api/api"
import UsersList from "@/widges/UsersList/ui/UsersList"
import { useEffect, useState } from "react"
import UseLogin from "@/shared/Hookcs/UseLogin"
import styleTitle from "@/shared/ui/Title.module.css"
import { Icategory } from "@/shared/types/types"

const AdminPanelPage = () => {
  const [categoryMarket, setCategoryMarket] = useState<Icategory[] | null>(null)

  useEffect(() => {
    async function fun() {
      const res = await getCategory()
      setCategoryMarket(res)
    }
    fun()
  }, [])
  const data = UseLogin(null, null, "admin")
  console.log(data)
  return (
    <main>
      {data && (
        <>
          <h2 className={styleTitle.title}>Редактировать товары и продукцию</h2>
          <CategoryList page={"adminPanel"} category={categoryMarket} />
          <h2 className={styleTitle.title}>Редактировать пользователей</h2>
          <UsersList />
        </>
      )}
    </main>
  )
}

export default AdminPanelPage
