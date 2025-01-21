import { Router } from "express";
import {UserController} from '../../controller/account/accountController'
import {body} from 'express-validator'


const router =  Router()

router.post('/registration',
  body('email').isEmail(), // Валидация
  body('password').isLength({min:3, max:32}), // Валидация
   UserController.registrarion)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/activated/:link', UserController.activated)
router.get('/refresh', UserController.refresh)
router.get('/users', UserController.getUsers)

export const accountRouter = router
