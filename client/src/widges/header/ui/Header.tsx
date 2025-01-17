'use client'

import Image from "next/image"
import style from "./Header.module.css"
import { FC } from "react"
import BurgerMenu from "@/features/navigation/ui/BurgerMenu"
import Link from "next/link"
import LikeGroup from "@/features/likeGroup/ui/likeGroup"
import { testReqest } from "../api/api"


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
        <Image className={style.icon} onClick={()=>registration('denis@mail.ru','22323')} src={"/user.svg"} alt="cart" width={30} height={30} />
        <LikeGroup />
      </div>
    </header>
  )
}


async function registration(email:any, password:any) {
  console.log(123)
 const result =  await testReqest(String(email),String(password))
 await console.log(result)
}
export default Header
