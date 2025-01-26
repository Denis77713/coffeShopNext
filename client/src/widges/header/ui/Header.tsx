"use client"

import Image from "next/image"
import style from "./Header.module.css"
import { FC, useState } from "react"
import BurgerMenu from "@/features/navigation/ui/BurgerMenu"
import Link from "next/link"
import LikeGroup from "@/features/likeGroup/ui/likeGroup"
import { refresh } from "../api/api"
import FormRegistration from "../../../features/FormRegistration/ui/FormRegistration"
import FormAccount from "@/features/FormAccount/ui/FormAccount"
const Header: FC = () => {
  const [page, setPage] = useState<null|string>(null)
  return (
    <>
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
          <Image
            className={style.icon}
            onClick={() => refresh()}
            src={"/cart.svg"}
            alt="cart"
            width={30}
            height={30}
          />
          <Image
            className={style.icon}
            src={"/user.svg"}
            alt="cart"
            width={30}
            height={30}
            onClick={()=>setPage('account')}
          />
          <LikeGroup />
        </div>
      </header>
      {page === "account" && <FormAccount setPage = {setPage}/>}
      {page === "registrarion" && <FormRegistration setPage = {setPage}/>}
      
    </>
  )
}

export default Header
