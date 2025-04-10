"use client"

import { useEffect } from "react"
import { getActivated, getAuth } from "../reducers/FormSlice"
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
        } catch (e) {
          localStorage.removeItem("token")
          try {
            await api.get("/refresh")
          } catch {
            const data = await api.get("/refresh")
            localStorage.setItem("token", data.data.accessToken)
            const AuthorizasionData = await api.get("/users")
            dispatch(getAuth(AuthorizasionData.status))
            dispatch(getActivated(AuthorizasionData.data.isActivated))
          }
        }
      } else {
        // await api.post("/logout")
        dispatch(getAuth(401))
      }
    }
    cheskRefresh()
  }, [])

  return null
}

export default UseLogin
