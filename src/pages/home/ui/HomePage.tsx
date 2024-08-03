import CarouselSlider from "@/entities/CarouselSlider/ui/CarouselSlider"
import LocationsList from "@/entities/LocationsList/ui/LocationsList"
import Title from "@/shared/ui/Title"
import Header from "@/widges/header/ui/Header"

export default async function Home() {
  return (
    <div className="container">
      <Header />
      <main>
        <Title coffeNum={"true"}>Кофейни:</Title>
        <CarouselSlider />
        <LocationsList />
      </main>
    </div>
  )
}
