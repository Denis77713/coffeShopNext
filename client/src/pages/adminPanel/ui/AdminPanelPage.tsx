import CategoryList from "@/widges/CategoryList/ui/CategoryList"
import style from "./AdminPanelPage.module.css"
import IsToken from "@/shared/Hookcs/IsToken"

const AdminPanelPage = async () => {
  return (
    <div className={style.list}>
      <IsToken />
      <CategoryList page={"adminPanel"} />
    </div>
  )
}

export default AdminPanelPage
