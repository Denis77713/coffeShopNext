import Title from "@/shared/ui/Title"
import { getContacts } from "../api/api"
import style from "./footer.module.css"

const Footer = async () => {
  const result = await getContacts()
  return (
    <footer className={`${style.footer} container qwe`}>
      <Title coffeNum="false" styles={style.title}>Контакты</Title>
      <div className={`${style.footerFlex} container`}>
        {result.map((item) => (
          <div className={style.footerFlexItem} key={item.id}>
            <p>{item.text}</p>
            <a className={style.mail} href={`mailto:${item.email}`}>{item.email}</a>
          </div>
        ))}
      </div>
    </footer>
  )
}

export default Footer
