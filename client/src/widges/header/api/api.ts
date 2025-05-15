import axios from "axios"

const urlApi = process.env.NEXT_PUBLIC_API

export const api = axios.create({
  withCredentials: true,
  baseURL: `${urlApi}/api`,
})
api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`
  return config
})
//
//

export const apiServer = axios.create({
  withCredentials: true,
  baseURL: `${urlApi}/api`,
})

export async function refresh() {
  return api.get("/refresh")
}

export async function Authorizasion() {
  let res
  try {
    res = api.get("/users")
  } catch (e) {
    res = e
  }
  return res
}
