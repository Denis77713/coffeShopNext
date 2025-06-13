"use client"

import { useEffect } from "react"
import { getActivated, getAuth, getUser } from "../reducers/FormSlice"
import { api } from "@/widges/header/api/api"
import { useDispatch } from "react-redux"

const UseLogin = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const cheskRefresh = async () => {
      const token = localStorage.getItem("token")
      if (token) {
        try {
          const AuthorizasionData = await api.get("/users")
          dispatch(getAuth(AuthorizasionData.status))
          dispatch(getActivated(AuthorizasionData.data.isActivated))
          dispatch(getUser(AuthorizasionData.data))
        } catch (e) {
          try {
            localStorage.removeItem("token")
            const data = await api.get("/refresh")
            localStorage.setItem("token", data.data.accessToken)
            const AuthorizasionData = await api.get("/users")
            dispatch(getAuth(AuthorizasionData.status))
            dispatch(getActivated(AuthorizasionData.data.isActivated))
            dispatch(getUser(AuthorizasionData.data))
          } catch {
            await api.post("/logout")
          }
        }
      } else {
        dispatch(getAuth(401))
        await api.post("/logout")
      }
    }
    cheskRefresh()
  }, [])

  return null
}

export default UseLogin
