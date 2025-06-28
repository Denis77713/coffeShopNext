import FormAddProduct from "@/widges/FormAddProduct/ui/FormAddProduct"
import { FC } from "react"
import style from "./adminPanelProduct.module.css"
import Link from "next/link"
import Button from "@/shared/ui/Button"
import Search from "@/features/Search/ui/Search"
import Pagination from "@/features/Pagination/ui/Pagination"
import IsToken from "@/shared/Hookcs/IsToken"
import AdminProductList from "@/widges/AdminProductList/ui/AdminProductList"
import { getCategory } from "@/pages/shop/ui/getProductAndFilters"
import FormImages from "@/features/FormImages/ui/FormImages"
import { apiServer } from "@/widges/header/api/api"

const adminPanelProduct: FC<{
  params: any
  searchParams: any
}> = async ({ params, searchParams }) => {
  //
  //
  const { id } = await params
  const { newParams } = await searchParams
  const numProductInPage = 8
  const res = await getCategory(`/${id}`, newParams, numProductInPage)
  const imagesArr = await apiServer.get("/getImages")
  //
  //
  return (
    <main className={`${style.wrapper}`}>
      <IsToken />
      <div className={style.mB}>
        <Search />
      </div>
      <Link href={"/adminPanel"}>
        <Button>Админ панель</Button>
      </Link>
      <FormImages imagesArr={imagesArr.data} />
      <FormAddProduct params={params} />
      <AdminProductList data={res.productData} />
      <Pagination numProduct={res.numProduct / numProductInPage} />
    </main>
  )
}

export default adminPanelProduct
