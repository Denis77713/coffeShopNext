import CategoryList from "@/widges/CategoryList/ui/CategoryList"
import style from "./AdminPanelPage.module.css"
import IsToken from "@/shared/Hookcs/IsToken"
import { getCategory } from "@/widges/CategoryList/api/api"

const AdminPanelPage = async () => {
  const categoryMarket = await getCategory()

  return (
    <div className={style.list}>
      <IsToken />
      <CategoryList page={"adminPanel"} category={categoryMarket} />
    </div>
  )
}

export default AdminPanelPage
