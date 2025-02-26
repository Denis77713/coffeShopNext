"use client"

import { useEffect } from "react"
import { getActivated, getAuth } from "../Form/ui/FormSlice"
import { Authorizasion, refresh } from "@/widges/header/api/api"
import { useDispatch } from "react-redux"
import { redirectAction } from "@/pages/account/api/api"

const UseLogin = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const cheskRefresh = async () => {
      const token = localStorage.getItem("token")
      if (token) {
        try {
          const AuthorizasionData = await Authorizasion()
          dispatch(getAuth(AuthorizasionData.status))
          dispatch(getActivated(AuthorizasionData.data.isActivated))
        } catch (e) {
          console.log(e)
          localStorage.removeItem("token")
          try {
            const data = await refresh()
            console.log(data)
            dispatch(getAuth(401))
            localStorage.setItem("token", data.data.accessToken)
            const AuthorizasionData = await Authorizasion()
            dispatch(getAuth(AuthorizasionData.status))
            dispatch(getActivated(AuthorizasionData.data.isActivated))
          } catch (e) {
            console.log("Не авторизован")
          }
        }
      } else {
        redirectAction("/")
      }
    }
    cheskRefresh()
  }, [])

  return null
}

export default UseLogin
