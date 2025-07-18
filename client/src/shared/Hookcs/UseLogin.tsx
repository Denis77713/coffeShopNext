"use client"

import { FC, useEffect, useLayoutEffect, useState } from "react"
import { getActivated, getAuth, getUser } from "../reducers/FormSlice"
import { api } from "@/widges/header/api/api"
import { useDispatch } from "react-redux"
import axios, { AxiosResponse } from "axios"
import { redirectAction } from "@/pages/account/api/api"
import { TypeUser } from "../types/types"

const UseLogin = (funct?: any, setState?: any, roleRedirect?: string) => {
  const host = process.env.NEXT_PUBLIC_HOST
  const urlApi = process.env.NEXT_PUBLIC_API
  const dispatch = useDispatch()
  const [data, setData] = useState<AxiosResponse<TypeUser, any> | null>(null)
  useLayoutEffect(() => {
    const cheskRefresh = async () => {
      const token = localStorage.getItem("token")
      if (token) {
        try {
          const data = await axios.get(`${urlApi}/api/refresh`, {
            withCredentials: true,
          })
          setData(data.data.user)
          if (roleRedirect && data?.data.user.role !== roleRedirect)
            redirectAction(host)

          localStorage.removeItem("token")
          localStorage.setItem("token", data.data.accessToken)
          dispatch(getAuth(data.status))
          dispatch(getActivated(data.data.user.isActivated))
          dispatch(getUser(data.data.user))
          if (funct) {
            const res = await funct()
            setState && setState(res.data)
          }
        } catch (e) {
          dispatch(getAuth(401))
          await api.post("/logout")
        }
      } else {
        dispatch(getAuth(401))
        // await api.post("/logout")
        if (roleRedirect) redirectAction(host)
      }
    }
    cheskRefresh()
  }, [])
  return data
}

export default UseLogin
