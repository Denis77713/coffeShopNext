import { createSlice } from "@reduxjs/toolkit"

export interface LikeState {
  window: boolean
  Auth: number | boolean
  Activated: boolean
  renderCart: boolean
  userId: number | null
  User: any
  UserRender: boolean
  CommentAndStar: any
}

const initialState: LikeState = {
  window: false,
  Auth: false,
  Activated: false,
  renderCart: false,
  userId: null,
  User: "Unauthorized",
  UserRender: false,
  CommentAndStar: false,
}

export const FormSlice = createSlice({
  name: "Form",
  initialState,
  reducers: {
    getCommentAndStar: (state, action) => {
      state.CommentAndStar = action.payload
      console.log(action.payload)
    },
    getUserRender: (state, action) => {
      state.UserRender = action.payload
    },
    getWindow: (state, action) => {
      state.window = action.payload
    },
    getUser: (state, action) => {
      state.User = action.payload
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
  getCommentAndStar,
  getUserRender,
  getWindow,
  getAuth,
  getActivated,
  getRenderCart,
  getUserId,
  getUser,
} = FormSlice.actions

export default FormSlice.reducer
