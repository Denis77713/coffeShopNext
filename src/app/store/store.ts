import { configureStore } from "@reduxjs/toolkit"
import LikeSlice from "@/features/likeGroup/ui/SlicelikeGroup"
import FavoriteSlice from "@/pages/favorites/ui/FavoriteSlice"
import ProductSlice from "@/entities/Product/ui/ProductSlice"
export const store = configureStore({
  reducer: {
    like: LikeSlice,
    product: FavoriteSlice,
    ProductSlice: ProductSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
