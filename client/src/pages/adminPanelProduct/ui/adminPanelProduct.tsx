import FormAddProduct from "@/widges/FormAddProduct/ui/FormAddProduct"
import { FC } from "react"
import { IParams } from "@/pages/shop/ui/ShopPage"
import style from "./adminPanelProduct.module.css"
import Link from "next/link"
import Button from "@/shared/ui/Button"
import Search from "@/features/Search/ui/Search"
import Pagination from "@/features/Pagination/ui/Pagination"
import IsToken from "@/shared/Hookcs/IsToken"
import AdminProductList from "@/widges/AdminProductList/ui/AdminProductList"
import { getCategory } from "@/pages/shop/ui/getProductAndFilters"

const adminPanelProduct: FC<{
  params: IParams
  searchParams: string
}> = async ({ params, searchParams }) => {
  //
  //
  const numProductInPage = 8
  const res = await getCategory(`/${params.id}`, searchParams, numProductInPage)
  //
  //
  return (
    <div className={`${style.wrapper}`}>
      <IsToken />
      <div className={style.mB}>
        <Search />
      </div>
      <Link href={"/adminPanel"}>
        <Button>Админ панель</Button>
      </Link>
      <FormAddProduct />
      <AdminProductList data={res.productData} />
      <Pagination numProduct={res.numProduct / numProductInPage} />
    </div>
  )
}

export default adminPanelProduct
