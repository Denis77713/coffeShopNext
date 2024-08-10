"use client"
import Image from "next/image"
import style from "./LikeGroup.module.css"
const LikeGroup = () => {
  return (
    <>
      <Image
        className={style.icon}
        src={"/like.svg"}
        alt="cart"
        width={30}
        height={30}
        onClick={handleclick}
      />
    </>
  )
  function handleclick() {
    const arr = []
    for(let i = 1; i < 10; i++){
      arr.push(localStorage.getItem(`like${i}`))
    }
    console.log(arr)
  }
}

export default LikeGroup
