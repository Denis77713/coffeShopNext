import { createSlice } from "@reduxjs/toolkit"

interface IntProductSlice {
  id: number
}

const initialState: IntProductSlice = {
  id: 0,
}

export const ProductSlice = createSlice({
  name: "ProductSlice",
  initialState,
  reducers: {
    getId: (state, action) => {
      state.id = action.payload
    },
  },
})

export const { getId } = ProductSlice.actions

export default ProductSlice.reducer
