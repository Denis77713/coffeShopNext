import FormAddProduct from "@/widges/FormAddProduct/ui/FormAddProduct"
import { FC } from "react"
import { IParams } from "@/pages/products/ui/ProductsPage"
import style from "./adminPanelProduct.module.css"
import Link from "next/link"
import Button from "@/shared/ui/Button"
import Search from "@/features/Search/ui/Search"
import Pagination from "@/features/Pagination/ui/Pagination"

const adminPanelProduct: FC<{ params: IParams,searchParams: string }> = async ({ params, searchParams }) => {
  // const res = await getCategory(`/${params.id}`, searchParams)
  return (
    <div className={`${style.wrapper}`}>
      <div className = {style.mB}>
        <Search/>
      </div>
      <Link href={"/adminPanel"}>
        <Button>Админ панель</Button>
      </Link>
      <FormAddProduct />
      {/* <AdminProductList data={res.productData}  /> */}
      <Pagination/>
    </div>
  )
}

export default adminPanelProduct
