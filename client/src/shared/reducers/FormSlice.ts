import { createSlice } from "@reduxjs/toolkit"

export interface LikeState {
  window: boolean
  Auth: number | boolean
  Activated: boolean
  renderCart: boolean
  userId: number | null
}

const initialState: LikeState = {
  window: false,
  Auth: false,
  Activated: false,
  renderCart: false,
  userId: null,
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
    getRenderCart: (state, action) => {
      state.renderCart = action.payload
    },
    getUserId: (state, action) => {
      state.userId = action.payload
    },
  },
})

export const {
  getWindow,
  getAuth,
  getActivated,
  getRenderCart,
  getUserId,
} = FormSlice.actions

export default FormSlice.reducer
