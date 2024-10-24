import FormAddProduct from "@/widges/FormAddProduct/ui/FormAddProduct";
import { getCategory, getProductList } from "../api/api";
import { FC } from "react";
import { IParams } from "@/pages/products/ui/ProductsPage";
import AdminProductList from "@/widges/AdminProductList/ui/AdminProductList";

const adminPanelProduct : FC<{ params: IParams }> = async ({params}) => {
  const category = await getCategory(params)
  console.log(params)
  const data = await getProductList(category[0].id)
  return (
    <>
      <FormAddProduct />
      <AdminProductList data = {data}/>
    </>
  )
};

export default adminPanelProduct;
