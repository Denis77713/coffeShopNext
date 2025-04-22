"use client"

import style from "./GradeStar.module.css"
import { FC, useState } from "react"
import Star from "./Star"
import { api } from "@/widges/header/api/api"
import { useDispatch, useSelector } from "react-redux"
import { getUserRender } from "../reducers/FormSlice"

interface Iuser {
  activationLink: string
  email: string
  id: number
  isActivated: boolean
  lastName: string
  name: string
  password: string
  role: "user" | "admin" | "manager" | "hr"
}

const GradeStar: FC<{ grade: number; productId: number }> = ({
  grade,
  productId,
}) => {
  const User = useSelector((store: any) => store.FormSlice.User)
  const UserRender = useSelector((store: any) => store.FormSlice.UserRender)
  const dispatch = useDispatch()
  const [render, setRender] = useState(0)
  const arr = getArr(render !== 0 ? render : grade)

  return (
    <div className={style.wrapperStar}>
      {arr.map((item) => (
        <div
          key={item.num}
          onClick={() => {
            postGrade(item.num, productId, User, render, setRender)
            dispatch(getUserRender(!UserRender))
          }}
        >
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

async function postGrade(
  grade: number,
  productId: number,
  User: string | Iuser,
  render: number,
  setRender: any
) {
  try {
    const res = await api.post("postGrade", {
      grade: grade,
      productId: productId,
      User: User,
    })
    // console.log(res)
    const newGradeSum = res.data.reduce(
      (acc: any, number: any) => acc + number.grade,
      0
    )
    const reStar =
      res.data.length !== 0 ? Math.round(newGradeSum / res.data.length) : 0

    // console.log(reStar)
    setRender(reStar)
  } catch (e) {
    console.log(e)
  }
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
