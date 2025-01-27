import { createSlice } from "@reduxjs/toolkit"


export interface LikeState {
  window: boolean
}

const initialState: LikeState = {
  window: false,
}

export const FormSlice = createSlice({
  name: "Form",
  initialState,
  reducers: {
    getWindow: (state, action) => {
      state.window = action.payload
    },
  },
})

export const { getWindow } = FormSlice.actions

export default FormSlice.reducer
