import FavoritesNumProduct from "@/widges/FavoritesNumProduct/ui/FavoritesNumProduct"
import FavoritesList from "@/widges/FavoritesList/ui/FavoritesList"
import { getCategoryes } from "@/widges/CategoryList/api/api"
import IsToken from "@/shared/Hookcs/IsToken"

const Favorites = async () => {
  const category = await getCategoryes()

  return (
    <main>
      <div className={`container`}>
        <IsToken />
        <FavoritesNumProduct />
        <FavoritesList category={category} />
      </div>
    </main>
  )
}

export default Favorites
