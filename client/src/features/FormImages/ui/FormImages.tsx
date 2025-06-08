"use client"

import Form from "@/shared/Form/ui/Form"
import { apiServer } from "@/widges/header/api/api"
import Image from "next/image"
import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import style from "./FormImages.module.css"
import { updateImage } from "../api/api"
import { getWindow } from "@/shared/reducers/FormSlice"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const FormImages: FC<{ imagesArr: any }> = ({ imagesArr }) => {
  //
  //
  const formVisible = useSelector((store: any) => store.FormSlice.window)
  const imageId = useSelector((store: any) => store.FormSlice.productId)
  const dispatch = useDispatch()
  //
  //
  const searchParams: any = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()

  return (
    <>
      {formVisible === "imageList" && (
        <Form>
          <div className={style.wrapperFormImages}>
            {imagesArr?.map((i: any) => (
              <Image
                onClick={() => {
                  updateImage(i.imageURL, imageId)
                  dispatch(getWindow(false))
                  postParams(i.imageURL)
                }}
                key={i.id}
                src={`/product/${i.imageURL}`}
                alt={i.imageURL}
                width={100}
                height={100}
                placeholder="blur"
                blurDataURL="/load.png"
              />
            ))}
          </div>
        </Form>
      )}
    </>
  )
  function postParams(i: string) {
    const params = new URLSearchParams(searchParams)
    if (i) {
      params.set("newImage", i)
    } else {
      params.delete("newImage")
    }
    replace(`${pathName}?${params.toString()}`)
  }
}

export default FormImages
