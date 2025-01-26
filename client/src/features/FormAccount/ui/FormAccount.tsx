import Button from "@/shared/ui/Button"
import FormAddProduct from "../../../widges/FormAddProduct/ui/FormAddProduct.module.css"
import registration from "../../FormRegistration/ui/FormRegistration.module.css"
import Image from "next/image"

const FormAccount = ({ setPage }: any) => {
  return (
    <div className={registration.wrapper}>
      <Image
        className={`${FormAddProduct.close} ${registration.zindex}`}
        src={"/close.svg"}
        alt="close"
        width={30}
        height={30}
        onClick={() => setPage(null)}
      />
      <div className={FormAddProduct.formProduct}>
        <Button>Логин</Button>
        <Button handleClick={() => setPage("registrarion")}>Регистрация</Button>
      </div>
    </div>
  )
}

export default FormAccount
