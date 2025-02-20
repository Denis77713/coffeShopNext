"use client"

import { Authorizasion } from "@/widges/header/api/api"
import { useEffect, useState } from "react"
import { redirectAction } from "../../../pages/account/api/api"
import { getProcuctAccount } from "../api/api"

const AccountProductList = () => {
  const [state, setstate] = useState<any>(null)
  //
  useEffect(() => {
    async function Login() {
      try {
        const AuthorizasionData = await Authorizasion()
        setstate(AuthorizasionData)
      } catch (e) {
        redirectAction("/")
      }
    }
    Login()
  }, [])
  useEffect(() => {
    async function getData() {
      if (state) {
        const data = await getProcuctAccount()
        console.log(data)
      }
    }
    getData()
  }, [state])

  return <></>
}

export default AccountProductList
