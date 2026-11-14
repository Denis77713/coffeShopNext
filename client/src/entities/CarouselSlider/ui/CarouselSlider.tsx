"use client"

import style from "./CarouselSlider.module.css"
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"
import { FC, useEffect, useState } from "react"

const CarouselSlider: FC<{ children: any; responsive: any }> = ({
  children,
  responsive,
}) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    setIsVisible(false)
  }, [Carousel])

  return (
    <div className={` ${style.slider} `}>
      {isVisible ? (
        <div className={style.skeleton}></div>
      ) : (
        <Carousel responsive={responsive} infinite={true}>
          {children}
        </Carousel>
      )}
    </div>
  )
}

export default CarouselSlider
