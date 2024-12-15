import { Router } from "express";
import userController from "./user.controller";
import { loginValidation, registerValidation } from "./user.validation";
import { validationResultMiddleware } from "../../common/middlewares/validation.middleware";
import { AuthGuard } from "../../common/middlewares/auth.guard";

const UserRoutes = Router()
UserRoutes.post('/register', registerValidation(), validationResultMiddleware, userController.register)
UserRoutes.post('/login', loginValidation(), validationResultMiddleware, userController.login)
UserRoutes.get('/profile', AuthGuard, userController.profile)
UserRoutes.put('/update', AuthGuard, userController.updateProfile)
UserRoutes.put('/updateEmail', AuthGuard, userController.updateEmail)
UserRoutes.post('/sendEmailOtp', AuthGuard, userController.sendEmailOtp)
UserRoutes.patch('/verifyEmail/:code', AuthGuard, userController.verifyEmail)

export default UserRoutes