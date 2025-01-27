import { createSlice } from "@reduxjs/toolkit"


export interface LikeState {
  window: boolean
  Auth: number | boolean
}

const initialState: LikeState = {
  window: false,
  Auth:false
}

export const FormSlice = createSlice({
  name: "Form",
  initialState,
  reducers: {
    getWindow: (state, action) => {
      state.window = action.payload
    },
    getAuth: (state, action) => {
      state.Auth = action.payload
      console.log(action.payload)
      console.log(state.Auth)
    },
  },
})

export const { getWindow,getAuth } = FormSlice.actions

export default FormSlice.reducer
