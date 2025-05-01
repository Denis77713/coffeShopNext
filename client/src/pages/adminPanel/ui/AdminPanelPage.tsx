import CategoryList from "@/widges/CategoryList/ui/CategoryList"
import style from "./AdminPanelPage.module.css"
import IsToken from "@/shared/Hookcs/IsToken"
import { getCategory } from "../api/api"

const AdminPanelPage = async () => {
  const categoryMarket = await getCategory()

  return (
    <main>
      <IsToken />
      <CategoryList page={"adminPanel"} category={categoryMarket} />
    </main>
  )
}

export default AdminPanelPage
