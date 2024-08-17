import Title from "@/shared/ui/Title"
import { getContacts } from "../api/api"
import style from "./footer.module.css"

const Footer = async () => {
  const result = await getContacts()
  console.log(result)
  return (
    <div className={`${style.footer} container`}>
      <Title coffeNum="false" styles={style.title}>Контакты</Title>
      <div className={`${style.footerFlex} container`}>
        {result.map((item) => (
          <div className={style.footerFlexItem} key={item.id}>
            <p>{item.text}</p>
            <a href={`mailto:mailto:${item.email}`}>{item.email}</a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Footer
