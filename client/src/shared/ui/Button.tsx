import { FC } from "react"
import style from "./Button.module.css"

interface IntButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  handleClick?: any
  
}

const Button: FC<IntButton> = ({ handleClick, children }) => {
  return (
    <button type="submit" onClick={handleClick} className={style.button}>
      {children}
    </button>
  )
}

export default Button
