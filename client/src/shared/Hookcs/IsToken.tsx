"use client"

import UseLogin from "./UseLogin"

const IsToken = () => {
  const token = localStorage.getItem("token")
  if (token) UseLogin()
  return null
}

export default IsToken
