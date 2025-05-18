import { newDataManagerItem } from "@/shared/types/types"
import { FC, forwardRef, useRef } from "react"
import QRCode from "react-qr-code"

const Scklad = forwardRef<any>(({ data }, ref) => {
  const url = process.env.NEXT_PUBLIC_HOST
  // status=Delivered
  data?.forEach((item) => console.log(item))
  return (
    <div ref={ref}>
      {data?.map((item) => (
        <div key={item.id}>
          <QRCode
            size={100}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={`${url}/managerPage?developId=${item.developId}&productId=${item.productId}`}
            viewBox={`0 0 256 256`}
          />
        </div>
      ))}
    </div>
  )
})

export default Scklad
