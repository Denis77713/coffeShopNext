import { useEffect } from "react"
import { IntStorageData } from "../like/ui/Like"
import { useDispatch } from "react-redux"
import { getLike } from "@/features/likeGroup/ui/SlicelikeGroup"

const useStorage = (state: boolean, setCount: any) => {
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
  }, [state])
}

export default useStorage
