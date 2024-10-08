import { FC } from "react"
import style from "./LocationCard.module.css"

interface ILocationCard {
  item: {
    id: number
    adress: string
    locatin: string
    time: string
    menu: string
    newIsOpen: boolean
    newLocation: string
    isWork?: boolean
    cityId: number
  }
}
const LocationCard: FC<ILocationCard> = ({ item }) => {
  return (
    <div className={style.cardLocation}>
      <strong>{item.adress}</strong>
      <div>{item.locatin}</div>
      <div>{item.time}</div>
      {item.isWork && <div className={style.noWork}>Временно не работает</div>}
      {item.newIsOpen && <div className={style.isOpen}>Скоро открытие</div>}
    </div>
  )
}

export default LocationCard
