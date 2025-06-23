import { createSlice } from "@reduxjs/toolkit"

interface data {
  id: number
  like: boolean
}

export interface LikeState {
  storage: data[]
  window: boolean
  storageCart: []
}

const initialState: LikeState = {
  storage: [{ id: 0, like: false }],
  window: false,
  storageCart: [],
}

export const LikeSlice = createSlice({
  name: "Like",
  initialState,
  reducers: {
    getLike: (state, action) => {
      state.storage = action.payload
    },
    getCart: (state, action) => {
      state.storageCart = action.payload
    },
  },
})

export const { getLike, getCart } = LikeSlice.actions

export default LikeSlice.reducer
