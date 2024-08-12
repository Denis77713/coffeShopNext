import { configureStore } from "@reduxjs/toolkit"
import LikeSlice from "@/features/likeGroup/ui/SlicelikeGroup"
export const store = configureStore({
  reducer: {
    like: LikeSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
