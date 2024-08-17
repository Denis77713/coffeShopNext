import FavoritesNumProduct from "@/widges/FavoritesNumProduct/ui/FavoritesNumProduct"
import FavoritesList from "@/widges/FavoritesList/ui/FavoritesList"

const Favorites = async () => {
  return (
    <main >
      <div className="container">
      <FavoritesNumProduct/>
      <FavoritesList />
      </div>
    </main>
  )
}

export default Favorites
