import axios from "axios"
import { prisma } from "../../../../prisma/prisma-client"

export const api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5000/api",
})
api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
  return config
})
//
//

export async function refresh() {
  return api.get("/refresh")
}

export async function getActivatedUser(id: number) {
  let result = false
  const res = await prisma.user.findMany({
    where: {
      id: id,
    },
  })
  // if(res?.isActivated === true) result = true
  return result
}
