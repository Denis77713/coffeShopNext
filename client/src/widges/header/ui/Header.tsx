import Image from "next/image"
import style from "./Header.module.css"
import { FC } from "react"
import BurgerMenu from "@/features/navigation/ui/BurgerMenu"
import Link from "next/link"
import LikeGroup from "@/features/likeGroup/ui/likeGroup"

const Header: FC = () => {
  return (
    <header className={`${style.headerFlex} container`}>
      <BurgerMenu />
      <Link href={"/"}>
        <Image
          className={style.headerImage}
          src={"/logo.png"}
          alt="logo"
          width={75}
          height={75}
          priority={true}
        />
      </Link>
      <div className={style.icons}>
        <Image className={style.icon} src={"/cart.svg"} alt="cart" width={30} height={30} />
        <Image className={style.icon} src={"/user.svg"} alt="cart" width={30} height={30} />
        <LikeGroup />
      </div>
    </header>
  )
}

export default Header
