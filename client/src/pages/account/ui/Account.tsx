import { getCategoryes } from "@/widges/CategoryList/api/api"
import AccountProductList from "../../../widges/AccountProductList/ui/AccountProductList"
import ProductPayList from "@/widges/ProductPayList/ui/ProductPayList"
const Account = async () => {
  const category = await getCategoryes()

  return (
    <>
      <ProductPayList category={category} />
      <AccountProductList category={category} />
    </>
  )
}

export default Account
