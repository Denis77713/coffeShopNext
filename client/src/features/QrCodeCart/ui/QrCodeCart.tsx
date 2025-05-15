"use client"

import Form from "@/shared/Form/ui/Form"
import { useEffect, useState } from "react"
import QRCode from "react-qr-code"
import { useSelector } from "react-redux"
import { getProductPay } from "../api/api"

const QrCodeCart = () => {
  const formVisible = useSelector((store: any) => store.FormSlice.window)
  const User = useSelector((store: any) => store.FormSlice.User)
  const [developId, setDevelopId] = useState("")

  useEffect(() => {
    async function func() {
      const result = await getProductPay(User.id)
      setDevelopId(result[0].developId)
    }
    func()
  }, [])
  const url = process.env.NEXT_PUBLIC_HOST
  return (
    <>
      {formVisible === "qrcode" && (
        <Form>
          <div
            style={{
              height: "auto",
              margin: "0 auto",
              maxWidth: 250,
              width: "100%",
            }}
          >
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={`${url}/managerPage?developId=${developId}&status=Delivered`}
              viewBox={`0 0 256 256`}
            />
          </div>
        </Form>
      )}
    </>
  )
}

export default QrCodeCart
