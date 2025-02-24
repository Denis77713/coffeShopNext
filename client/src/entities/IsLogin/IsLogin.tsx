"use client"

import { redirectAction } from "@/pages/account/api/api"
import { getAuth } from "@/shared/Form/ui/FormSlice"
import { Authorizasion } from "@/widges/header/api/api"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const IsLogin = () => {
  const dispatch = useDispatch()
  const Auth = useSelector((store: any) => store.FormSlice.Auth)

  useEffect(() => {
    async function Login() {
      try {
        const data = await Authorizasion()
        data.status === 200 && dispatch(getAuth(200))
      } catch (e) {
        redirectAction("/")
      }
    }
    Login()
  }, [])
  return <></>
}

export default IsLogin
