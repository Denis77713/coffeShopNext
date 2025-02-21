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
        await Authorizasion()
        const data = await getProcuctAccount()
        setstate(data)
      } catch (e) {
        redirectAction("/")
      }
    }
    Login()
  }, [])

  return <></>
}

export default AccountProductList
