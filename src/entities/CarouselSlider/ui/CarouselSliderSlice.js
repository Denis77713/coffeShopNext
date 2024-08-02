import { createSlice } from "@reduxjs/toolkit"

const CarouselSliderSlice = createSlice({
  name: "SliderSlice",
  initialState: {
    value: "123",
  },
  reducers: {
    getTargetDom(state, action) {
      console.log(state.value)
    },
  },
})
export const { getTargetDom } = CarouselSliderSlice.actions
export default CarouselSliderSlice.reducer
