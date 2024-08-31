import FavoritesNumProduct from "@/widges/FavoritesNumProduct/ui/FavoritesNumProduct"
import FavoritesList from "@/widges/FavoritesList/ui/FavoritesList"
import { getCategoryes } from "@/widges/CategoryList/api/api"

const Favorites = async () => {
  const category = await getCategoryes()

  return (
    <main >
      <div className="container">
      <FavoritesNumProduct/>
      <FavoritesList category={category}/>
      </div>
    </main>
  )
}

export default Favorites
