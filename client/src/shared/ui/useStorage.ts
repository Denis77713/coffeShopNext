import { useEffect } from "react"
import { IntStorageData } from "../like/ui/Like"
import { useDispatch } from "react-redux"
import { getLike } from "@/shared/reducers/LikeSlice"

const useStorage = (setCount: any) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const savedValue = window.localStorage.getItem(`like`)
    if (savedValue) {
      setCount(
        JSON.parse(savedValue).sort((a: IntStorageData, b: IntStorageData) =>
          a.id > b.id ? 1 : -1
        )
      )
      dispatch(
        getLike(
          JSON.parse(savedValue).sort((a: IntStorageData, b: IntStorageData) =>
            a.id > b.id ? 1 : -1
          )
        )
      )
    }
  }, [])
}

export default useStorage
