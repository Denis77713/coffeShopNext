import CarouselSlider from "@/entities/CarouselSlider/ui/CarouselSlider"
import LocationsList from "@/entities/LocationsList/ui/LocationsList"
import Header from "@/widges/header/ui/Header"
import { Suspense } from "react"

export default async function Home() {
  return (
    <div className="container">
      <Header />
      <main>
          <CarouselSlider />
          <LocationsList />
      </main>
    </div>
  )
}
