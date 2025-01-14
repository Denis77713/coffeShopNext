import Image from "next/image"
import { FC } from "react"
import style from './WhyUs.module.css'

interface IntItemWhyUs {
  id: number
  text: string
  image: string
  title: string
}
interface IntWhyUs {
  item: IntItemWhyUs
}


const WhyUs: FC<IntWhyUs> = ({ item }) => {
  return (
    <div className={style.card}>
      <Image
        src={`/WhyUs/${item.image}.svg`}
        alt={item.title}
        width={30}
        height={30}
      />
      <div>{item.title}</div>
      <p>{item.text}</p>
    </div>
  )
}

export default WhyUs
