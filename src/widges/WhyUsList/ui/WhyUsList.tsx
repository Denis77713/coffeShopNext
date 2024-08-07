import { FC } from "react"
import { getText } from "../api/api"

const WhyUsList: FC = async () => {
  const result = await getText()
  console.log(result)
  return <div></div>
}

export default WhyUsList
