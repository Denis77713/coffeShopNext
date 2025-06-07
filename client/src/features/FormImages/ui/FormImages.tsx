"use client"

import Form from "@/shared/Form/ui/Form"
import { apiServer } from "@/widges/header/api/api"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import style from "./FormImages.module.css"
import { updateImage } from "../api/api"
import { getWindow } from "@/shared/reducers/FormSlice"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

const FormImages = () => {
  //
  //
  const formVisible = useSelector((store: any) => store.FormSlice.window)
  const imageId = useSelector((store: any) => store.FormSlice.productId)
  const [imagesArr, setImagesArr] = useState<any>(null)
  const dispatch = useDispatch()
  //
  //
  const searchParams: any = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()
  //
  //
  useEffect(() => {
    async function func() {
      const result = await apiServer.get("/getImages")
      setImagesArr(result.data)
    }
    func()
  }, [])
  //
  //
  console.log(imagesArr)
  return (
    <>
      {formVisible === "imageList" && (
        <Form>
          <div className={style.wrapperFormImages}>
            {imagesArr &&
              imagesArr?.map((i: any) => (
                <Image
                  onClick={() => {
                    updateImage(i, imageId)
                    dispatch(getWindow(false))
                    postParams(i)
                  }}
                  key={i}
                  src={`/product/${i}`}
                  alt={i}
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
