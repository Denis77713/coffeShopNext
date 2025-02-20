"use client"

import Image from "next/image"
import style from "./Header.module.css"
import { FC, useEffect, useState } from "react"
import BurgerMenu from "@/features/navigation/ui/BurgerMenu"
import Link from "next/link"
import { Authorizasion, refresh } from "../api/api"
import FormRegistration from "../../../features/FormRegistration/ui/FormRegistration"
import FormAccount from "@/features/FormAccount/ui/FormAccount"
import { useDispatch, useSelector } from "react-redux"
import { getActivated, getAuth, getWindow } from "@/shared/Form/ui/FormSlice"
import FormLogin from "@/features/FormLogin/ui/FormLogin"
import { logout } from "@/features/FormRegistration/api/api"
import { redirectAction } from "@/pages/account/api/api"
import CartForm from "@/features/CartForm/ui/CartForm"
import { IntStorageData } from "@/shared/like/ui/Like"
import IconHeader from "@/features/IconHeader/ui/IconHeader"

const Header: FC = () => {
  const formVisible = useSelector((store: any) => store.FormSlice.window)
  const Auth = useSelector((store: any) => store.FormSlice.Auth)
  const Activated = useSelector((store: any) => store.FormSlice.Activated)
  const renderCart = useSelector((store: any) => store.FormSlice.renderCart)
  const dispatch = useDispatch()
  const [cart, setCart] = useState([])
  const data = useSelector((store: any) => store.like.storage)
  const num = data.filter((item: IntStorageData) => item.like === true)

  useEffect(() => {
    const cheskRefresh = async () => {
      const storage = localStorage.getItem("cart")
      setCart(storage ? JSON.parse(storage) : null)
      const token = localStorage.getItem("token")
      if (token) {
        try {
          const AuthorizasionData = await Authorizasion()
          dispatch(getAuth(AuthorizasionData.status))
          dispatch(getActivated(AuthorizasionData.data.isActivated))
        } catch (e) {
          localStorage.removeItem("token")
          try {
            const data = await refresh()
            console.log(data)
            dispatch(getAuth(401))
            localStorage.setItem("token", data.data.accessToken)
            const AuthorizasionData = await Authorizasion()
            dispatch(getAuth(AuthorizasionData.status))
            dispatch(getActivated(AuthorizasionData.data.isActivated))
          } catch (e) {}
        }
      }
    }
    cheskRefresh()
  }, [])

  useEffect(() => {
    const storage = localStorage.getItem("cart")
    setCart(storage ? JSON.parse(storage) : null)
  }, [renderCart])

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
          {Activated === true && Auth === 200 && (
            <div className={style.cart} onClick={() => handleClickCart()}>
              <IconHeader
                image={"/cart.svg"}
                alt={"cart"}
                num={cart ? cart : []}
              />
            </div>
          )}
          {Activated === true && Auth === 200 ? (
            <Link href={"/account"}>
              <div className={style.account}>
                <Image
                  className={`${style.icon} ${style.account}`}
                  src={"/user.svg"}
                  alt="user"
                  width={30}
                  height={30}
                />
              </div>
            </Link>
          ) : (
            <Image
              className={`${style.icon}`}
              src={"/user.svg"}
              alt="user"
              width={30}
              height={30}
              onClick={() => dispatch(getWindow("account"))}
            />
          )}
          {Activated === true && Auth === 200 && (
            <div className={style.exit}>
              <Image
                className={`${style.icon} ${style.logout}`}
                src={"/logout.svg"}
                alt="logout"
                width={21}
                height={21}
                onClick={() => {
                  logout()
                  dispatch(getAuth(false))
                  dispatch(getActivated(false))
                  localStorage.removeItem("token")
                  redirectAction("/")
                  dispatch(getWindow(false))
                }}
              />
            </div>
          )}
          <Link href={"/favorites"}>
            <IconHeader image={"/like.svg"} alt={"like"} num={num} />
          </Link>
        </div>
      </header>
      {formVisible === "account" && <FormAccount />}
      {formVisible === "registrarion" && <FormRegistration />}
      {formVisible === "login" && <FormLogin />}
      {cart && cart.length !== 0 && formVisible === "cart" && (
        <CartForm setCart={setCart} />
      )}
    </>
  )
  function handleClickCart() {
    const storage = localStorage.getItem("cart")
    dispatch(getWindow("cart"))
    setCart(storage ? JSON.parse(storage) : null)
  }
}

export default Header
