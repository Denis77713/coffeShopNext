import { Router } from "express"
import { UserController } from "../../controller/account/accountController"
import { body } from "express-validator"
import { isAuth } from "../../middleware/isAuth"
import { fileController } from "../../controller/account/fileController"
import { isEmail } from "../../middleware/IsEmail"
const router = Router()

router.post(
  "/registration",
  // isEmail, // Валидация
  UserController.registrarion
)
router.post("/login", UserController.login)
router.post("/logout", UserController.logout)
router.get("/activated/:link", UserController.activated)
router.get("/refresh", UserController.refresh)
router.post("/getCartPay", isAuth, UserController.getCartPay)
router.get("/product", isAuth, UserController.getProduct)
router.get("/users", isAuth, UserController.getUsers)
router.post("/getGrade", UserController.getGrade)
router.post("/postGrade", UserController.postGrade)
router.post("/upload", fileController.fileLoad)
router.get("/getImages", fileController.imageLoad)
router.post("/postpdf", fileController.pdfLoad)

export const accountRouter = router
