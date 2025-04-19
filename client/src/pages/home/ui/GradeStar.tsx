"use client"

import Image from "next/image"
import style from "./GradeStar.module.css"
import { FC } from "react"
import star from "./star.svg"

const GradeStar: FC<{ grade: number }> = ({ grade }) => {
  function getArr(grade: number) {
    let arr = []
    if (grade && grade !== 0) {
      for (let i = 0; i < grade; i++) {
        arr.push({ num: i + 1, value: true })
      }
      for (let i = grade; i < 5; i++) {
        arr.push({ num: i + 1, value: false })
      }
    } else {
      arr = [
        { num: 1, value: false },
        { num: 2, value: false },
        { num: 3, value: false },
        { num: 4, value: false },
        { num: 5, value: false },
      ]
    }
    return arr
  }

  const arr = getArr(grade)
  console.log(arr)
  return (
    <>
      {arr.map((item) => (
        <Image
          className={item.value ? style.star : ""}
          onClick={() => console.log(item.num)}
          key={item.num}
          src={star}
          alt="star"
          width={20}
          height={20}
          priority
        />
      ))}
    </>
  )
}

export default GradeStar
