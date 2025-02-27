"use client"

import { redirectAction } from "@/pages/account/api/api"
import UseLogin from "@/shared/Hookcs/UseLogin"
import { useEffect } from "react"
import { useSelector } from "react-redux"

const IsLogin = () => {
  UseLogin()
  const Auth = useSelector((store: any) => store.FormSlice.Auth)
  useEffect(() => {
    Auth === 401 && redirectAction("/")
  }, [Auth])
  return null
}

export default IsLogin
