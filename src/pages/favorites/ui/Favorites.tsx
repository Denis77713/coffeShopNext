import FavoritesNumProduct from "@/widges/FavoritesNumProduct/ui/FavoritesNumProduct"
import FavoritesList from "@/widges/FavoritesList/ui/FavoritesList"

const Favorites = async () => {
  return (
    <div className="container">
      <FavoritesNumProduct/>
      <FavoritesList />
    </div>
  )
}

export default Favorites
