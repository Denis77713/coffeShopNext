import axios from "axios"

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

export const apiServer = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5000/api",
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
