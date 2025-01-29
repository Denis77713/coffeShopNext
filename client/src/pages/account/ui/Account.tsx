import IsLogin from "./isLogin"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { headers } from 'next/headers'
const Account = async () => {
  
  return (
    <>
      <IsLogin />
      <h1>account</h1>
    </>
  )
}

export default Account
