"use client"

import style from "./GradeStar.module.css"
import { FC } from "react"
import Star from "./Star"

const GradeStar: FC<{ grade: number; productId: number }> = ({
  grade,
  productId,
}) => {
  const arr = getArr(grade)
  return (
    <div className={style.wrapperStar}>
      {arr.map((item) => (
        <div key={item.num} onClick={() => postGrade(item.num, productId)}>
          <Star
            className={style.star}
            fill={item.value ? "yellow" : "transparent"}
            stroke={item.value ? "yellow" : "black"}
          />
        </div>
      ))}
    </div>
  )
}

export default GradeStar

function postGrade(num: number, productId: number) {
  console.log(num)
  console.log(productId)
}

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
