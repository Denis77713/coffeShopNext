import CategoryList from "@/widges/CategoryList/ui/CategoryList"
import style from './AdminPanelPage.module.css'

const AdminPanelPage = async () => {
  return (
    <div className={style.list}>
      <CategoryList  page={"adminPanel"} />
    </div>
  )
}

export default AdminPanelPage
