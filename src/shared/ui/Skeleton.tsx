import { FC } from "react"
import style from "./Skeleton.module.css"

interface IntSkeleton {
  number: number
  wrapper?: string
  inner?: string
}

const Skeleton: FC<IntSkeleton> = ({ number, wrapper, inner }) => {
  let arr2 = []
  for (let i = 0; i < number; i++) {
    arr2.push(1)
  }
  console.log(arr2)
  return (
    <div className={wrapper}>
      {arr2.map((item) => (
        <div className={`${style.skeleton} ${inner} `} key={item}></div>
      ))}
    </div>
  )
}

export default Skeleton
