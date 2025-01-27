"use client"

import Image from "next/image"
import style from "./Header.module.css"
import { FC, useEffect, useState } from "react"
import BurgerMenu from "@/features/navigation/ui/BurgerMenu"
import Link from "next/link"
import LikeGroup from "@/features/likeGroup/ui/likeGroup"
import { refresh } from "../api/api"
import FormRegistration from "../../../features/FormRegistration/ui/FormRegistration"
import FormAccount from "@/features/FormAccount/ui/FormAccount"
import {  useDispatch, useSelector } from "react-redux"
import { getWindow } from "@/shared/Form/ui/FormSlice"
const Header: FC = () => {
  const formVisible = useSelector((store: any) => store.FormSlice.window)
  const dispatch = useDispatch()
  
  useEffect(() => {
    console.log("render")
    const cheskRefresh = async () => {
      try{
        const token = localStorage.getItem('token')
        if(token){
          const data = await refresh()
          console.log(data)
        }
      }catch(e){
        console.log(e)
      }
    }
    cheskRefresh()
  }, [])

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
            onClick={()=> dispatch(getWindow('account'))}
          />
          <LikeGroup />
        </div>
      </header>
      {formVisible === "account" && <FormAccount />}
      {formVisible === "registrarion" && <FormRegistration />}
    </>
  )
}

export default Header
