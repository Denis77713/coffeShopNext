import { Authorizasion, api } from "@/widges/header/api/api"

export async function getProcuctAccount() {
  return api.get("/product")
}
async function Login() {
  const Auth = await Authorizasion()
  const data = await getProcuctAccount()
  return Auth ? data : null
}
// redirectAction("/")
