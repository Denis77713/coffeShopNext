import { Router } from "express";
import {UserController} from '../../controller/account/accountController'


const router =  Router()

router.post('/registration', UserController.registrarion)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/activated/:link', UserController.activated)
router.get('/refresh', UserController.refresh)
router.get('/users', UserController.getUsers)

export const accountRouter = router
