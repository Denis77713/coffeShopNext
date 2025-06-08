import CategoryList from "@/widges/CategoryList/ui/CategoryList"
import IsToken from "@/shared/Hookcs/IsToken"
import { getCategory } from "../api/api"
import Title from "@/shared/ui/Title"
import styleTitle from "@/pages/home/ui/HomePage.module.css"
import UsersList from "@/widges/UsersList/ui/UsersList"

const AdminPanelPage = async () => {
  const categoryMarket = await getCategory()
  return (
    <main>
      <IsToken />
      <Title coffeNum={"false"} styles={styleTitle.title}>
        Редактировать товары и продукцию
      </Title>
      <CategoryList page={"adminPanel"} category={categoryMarket} />

      <Title coffeNum={"false"} styles={styleTitle.title}>
        Редактировать пользователей
      </Title>
      <UsersList />
    </main>
  )
}

export default AdminPanelPage
