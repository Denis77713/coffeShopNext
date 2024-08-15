import { createSlice } from "@reduxjs/toolkit"

interface IntProductSlice {
  product: number
  sum: number
}



const initialState: IntProductSlice = {
  product: 0,
  sum: 0,
}

export const ProductSlice = createSlice({
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

export const { getProductNum,getProductSum } = ProductSlice.actions

export default ProductSlice.reducer
