import { createSlice } from "@reduxjs/toolkit"

interface IntProductSlice {
  product: number
  sum: number
}

const initialState: IntProductSlice = {
  product: 0,
  sum: 0,
}

export const FavoriteSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    getProductNum: (state, action) => {
      state.product = action.payload
    },
    getProductSum: (state, action) => {
      state.sum = action.payload
    },
  },
})

export const { getProductNum, getProductSum } = FavoriteSlice.actions

export default FavoriteSlice.reducer
