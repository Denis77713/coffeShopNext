import { api } from "@/widges/header/api/api"

export async function getProcuctAccount() {
  return api.get("/product")
}
