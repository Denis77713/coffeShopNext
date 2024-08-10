import Image from "next/image"
import { FC } from "react"
import style from './iconList.module.css'
import LikeGroup from "@/features/likeGroup/ui/likeGroup"
type TypeSearch = true | false

interface InterfaseIconList {
  search: TypeSearch
}
const IconList: FC<InterfaseIconList> = async ({ search }) => {
  return (
    <div className={style.icons}>
      <Image className={style.icon} src={"/cart.svg"} alt="cart" width={30} height={30} />
      <Image className={style.icon} src={"/user.svg"} alt="cart" width={30} height={30} />
      <LikeGroup/>
{/*  */}
      {search && (
        <Image className={style.icon} src={"/search.svg"} alt="cart" width={30} height={30} />
      )}
    </div>
  )
}

export default IconList
