import { getCategoryes } from "@/widges/CategoryList/api/api"
import AccountProductList from "../../../widges/AccountProductList/ui/AccountProductList"
import IsLogin from "@/entities/IsLogin/IsLogin"
const Account = async () => {
  const category = await getCategoryes()

  return (
    <>
      <IsLogin />
      <AccountProductList category={category} />
      <h1>account</h1>
    </>
  )
}

export default Account
