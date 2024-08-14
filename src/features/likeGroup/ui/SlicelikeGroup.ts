import { createSlice } from "@reduxjs/toolkit"

interface data {
  id: number
  like: boolean
}

export interface LikeState {
  storage: data[]
  window: boolean
}

const initialState: LikeState = {
  storage: [{ id: 0, like: false }],
  window: false,
}

export const LikeSlice = createSlice({
  name: "Like",
  initialState,
  reducers: {
    getLike: (state, action) => {
      state.storage = action.payload
      console.log(state.storage)
    },
  },
})

export const { getLike } = LikeSlice.actions

export default LikeSlice.reducer
