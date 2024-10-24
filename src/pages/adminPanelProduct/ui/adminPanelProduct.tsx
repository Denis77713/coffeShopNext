import FormAddProduct from "@/widges/FormAddProduct/ui/FormAddProduct"
import { getCategory, getProductList } from "../api/api"
import { FC } from "react"
import { IParams } from "@/pages/products/ui/ProductsPage"
import AdminProductList from "@/widges/AdminProductList/ui/AdminProductList"
import style from "./adminPanelProduct.module.css"

const adminPanelProduct: FC<{ params: IParams }> = async ({ params }) => {
  const category = await getCategory(params)
  console.log(params)
  const data = await getProductList(category[0].id)
  return (
    <div className={`${style.wrapper}`}>
      <FormAddProduct />
      <div className={`${style.marTop}`}>
        <AdminProductList data={data} />
      </div>
    </div>
  )
}

export default adminPanelProduct
