"use client"

import { Star } from "@/entities/Product/ui/Product"
import Button from "@/shared/ui/Button"
import { FC, use, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import style from "./AddCommentInProduct.module.css"
import TextareaAutosize from "react-textarea-autosize"
import GradeStar from "@/shared/Star/GradeStar"
import { postComment, updateComment } from "../api/api"
import { getCommentAndStar } from "@/shared/reducers/FormSlice"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const AddCommentInProduct: FC<{
  grade: Star[]
  product: any
}> = ({ grade, product }) => {
  const User = useSelector((store: any) => store.FormSlice.User)

  const [Visible, setVisible] = useState(false)
  const [input, setInput] = useState<string>("")
  const [state, setState] = useState(0)
  const searchParams: any = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()
  const filteResult = grade.filter((item) => item.userId === User.id)
  const dataRender = getDataRender()
  //
  //

  // console.log(filteResult.length === 0)
  // console.log(dataRender)
  console.log(grade.length !== 0)
  return (
    <>
      {User !== "Unauthorized" && dataRender && (
        <div className={style.wrapperComment}>
          {!Visible && (
            <div className={style.wrapperBtn}>
              <Button handleClick={() => setVisible(true)}>
                {grade.length !== 0 && grade[0].comment === null
                  ? "Редактировать комментарий"
                  : "Добавить комментарий"}
              </Button>
            </div>
          )}
          {Visible && (
            <div className={style.Comment}>
              <TextareaAutosize
                className={style.commetntInput}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                minRows={3}
                maxRows={30}
              />
              <GradeStar grade={0} setState={setState} />
              <Button
                handleClick={() => {
                  setVisible(false)
                  setInput("")
                  grade.length !== 0 && grade[0].comment === ""
                    ? updateComment(input, state, User.id, product[0].id)
                    : postComment(input, state, User.id, product[0].id)
                  postSearch(state, input)
                }}
              >
                Отправить
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  )
  function postSearch(state: number, input: string) {
    const params = new URLSearchParams(searchParams)
    params.set("grade", String(state))
    replace(`${pathName}?${params.toString()}`)
  }
  function getDataRender() {
    let dataRender = false
    if (filteResult.length === 0) dataRender = true
    if (grade.length !== 0) {
      if (filteResult.length !== 0 && grade[0].comment === null)
        dataRender = true
    }

    return dataRender
  }
}
export default AddCommentInProduct
