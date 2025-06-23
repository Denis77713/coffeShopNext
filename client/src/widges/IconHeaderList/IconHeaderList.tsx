import IconHeader from "@/features/IconHeader/ui/IconHeader"
import { isLikeFilter } from "@/shared/like/ui/FunctionsLike"
import { getWindow } from "@/shared/reducers/FormSlice"
import Link from "next/link"
import { memo } from "react"
import { useDispatch, useSelector } from "react-redux"
import styles from "../../features/IconHeader/ui/IconHeader.module.css"

const IconHeaderList = ({ setCart }: any) => {
  //
  //
  const Activated = useSelector((store: any) => store.FormSlice.Activated)
  const Auth = useSelector((store: any) => store.FormSlice.Auth)
  const dispatch = useDispatch()
  const storageCart = useSelector((store: any) => store.LikeSlice.storageCart)
  const likeStore = useSelector((store: any) => store.LikeSlice.storage)
  //
  //
  console.log(storageCart)
  const handleClickCart = () => {
    const storage = localStorage.getItem("cart")
    dispatch(getWindow("cart"))
    setCart(storage ? JSON.parse(storage) : null)
  }
  function getCart() {
    let res = []
    const storage = localStorage.getItem("cart")
    if (storage) res = JSON.parse(storage)
    return res
  }
  //
  //
  const MemoIconHeader = memo(IconHeader)
  return (
    <>
      <Link href={"/favorites"}>
        <MemoIconHeader
          image={"/like.svg"}
          alt={"like"}
          num={likeStore}
          func={isLikeFilter(likeStore)}
        />
      </Link>
      {Activated === true && Auth === 200 && (
        <div className={styles.cart} onClick={() => handleClickCart()}>
          <MemoIconHeader
            image={"/cart.svg"}
            alt={"cart"}
            num={storageCart}
            func={getCart()}
          />
        </div>
      )}
    </>
  )
}

export default IconHeaderList
