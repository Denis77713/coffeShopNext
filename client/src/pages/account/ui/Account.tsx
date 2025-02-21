import { getCategoryes } from "@/widges/CategoryList/api/api"
import AccountProductList from "../../../widges/AccountProductList/ui/AccountProductList"
const Account = async () => {
  const category = await getCategoryes()

  return (
    <>
      <AccountProductList category={category} />
      <h1>account</h1>
    </>
  )
}

export default Account
