import { newDataManagerItem } from "@/shared/types/types"
import { FC } from "react"

const Scklad: FC<{ data: newDataManagerItem[] | null }> = ({ data }) => {
  data?.forEach((item) => console.log(item))
  return <></>
}

export default Scklad
