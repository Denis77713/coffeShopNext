import { FC } from "react"
import { getText } from "../api/api"
import WhyUs from "@/entities/WhyUs/WhyUs"
import style from './WhyUsList.module.css'


const WhyUsList: FC = async () => {
  const result = await getText()
  return (
  <div className={style.wrapper}>
    {result.map(item=>
      <WhyUs key={item.id} item={item}/>
    )}
  </div>
  )
}

export default WhyUsList
