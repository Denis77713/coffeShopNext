"use client"

import { FC, useEffect } from "react"
import { getActivated, getAuth, getUser } from "../reducers/FormSlice"
import { api } from "@/widges/header/api/api"
import { useDispatch } from "react-redux"
import axios from "axios"

const UseLogin = (funct?: any, setState?: any) => {
  const urlApi = process.env.NEXT_PUBLIC_API
  const dispatch = useDispatch()
  useEffect(() => {
    const cheskRefresh = async () => {
      const token = localStorage.getItem("token")
      if (token) {
        try {
          const data = await axios.get(`${urlApi}/api/refresh`, {
            withCredentials: true,
          })
          localStorage.removeItem("token")
          localStorage.setItem("token", data.data.accessToken)
          dispatch(getAuth(data.status))
          dispatch(getActivated(data.data.user.isActivated))
          dispatch(getUser(data.data.user))
          if (funct) {
            const res = await funct()
            setState(res.data)
          }
        } catch (e) {
          dispatch(getAuth(401))
          await api.post("/logout")
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
