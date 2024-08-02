import { configureStore } from "@reduxjs/toolkit"
import getTargetDom from "@/entities/CarouselSlider/ui/CarouselSliderSlice"
export const store = configureStore({
  reducer: {
    getTargetDom,
  },
})

// export type RootState = 