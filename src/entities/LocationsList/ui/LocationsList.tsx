import { FC } from "react"
import { getLocations } from "../../../shared/api/api"
import LocationCard from "@/entities/LocationCard/ui/LocationCard"
import style from "./LocationsList.module.css"

const LocationsList: FC = async () => {
  const data = await getLocations()

  return (
    <div className={style.ListCard}>
      {data.map((item) => (
        <LocationCard key={item.id} item={item} />
      ))}
    </div>
  )
}

export default LocationsList
