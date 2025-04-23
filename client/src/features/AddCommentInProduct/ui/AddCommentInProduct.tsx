"use client"

import { Star } from "@/entities/Product/ui/Product"
import Button from "@/shared/ui/Button"
import { FC, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import style from "./AddCommentInProduct.module.css"
import TextareaAutosize from "react-textarea-autosize"
import GradeStar from "@/shared/Star/GradeStar"
import { postComment } from "../api/api"

const AddCommentInProduct: FC<{ grade: Star[]; product: any }> = ({
  grade,
  product,
}) => {
  const User = useSelector((store: any) => store.FormSlice.User)

  const [Visible, setVisible] = useState(false)
  const [filteResult, setFilteResult] = useState<any>([])
  const [input, setInput] = useState<string>("")
  const [state, setState] = useState(12)

  useEffect(() => {
    const result = grade.filter((item) => item.userId === User.id)
    setFilteResult(result)
  }, [])

  return (
    <>
      {filteResult.length === 0 ? (
        <div className={style.wrapperComment}>
          {!Visible && (
            <div className={style.wrapperBtn}>
              <Button handleClick={() => setVisible(true)}>
                Добавить комментарий
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
                  postComment(input, state, User.id, product[0].id)
                }}
              >
                Отправить
              </Button>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default AddCommentInProduct
