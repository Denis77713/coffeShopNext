import { FC } from "react"
import style from './Button.module.css'

interface IntButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const Button: FC<IntButton> = ({ children }) => {
  return <button className={style.button}>{children}</button>
}

export default Button
