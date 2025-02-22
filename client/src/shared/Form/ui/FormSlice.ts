import { createSlice } from "@reduxjs/toolkit"


export interface LikeState {
  window: boolean
  Auth: number | boolean
  Activated: boolean
}

const initialState: LikeState = {
  window: false,
  Auth:false,
  Activated: false
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
    },    
    getActivated: (state, action) => {
      state.Activated = action.payload
    },
  },
})

export const { getWindow, getAuth, getActivated } = FormSlice.actions

export default FormSlice.reducer
