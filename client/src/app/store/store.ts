import { configureStore } from "@reduxjs/toolkit"
import LikeSlice from "@/shared/reducers/LikeSlice"
import FavoriteSlice from "@/shared/reducers/FavoriteSlice"
import ProductSlice from "@/shared/reducers/ProductSlice"
import FormSlice from "@/shared/reducers/FormSlice"

export const store = configureStore({
  reducer: {
    LikeSlice: LikeSlice,
    product: FavoriteSlice,
    ProductSlice: ProductSlice,
    FormSlice: FormSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
