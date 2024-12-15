import { NextFunction, Request, Response } from "express";
import userService from "./user.service";
import StatusCodes from 'http-status-codes';
import { setCookie } from "../../common/utils/cookie.utils";
class UserController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const registerDto = req.body
            const result = await userService.register(registerDto)
            res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    message: result
                }
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const loginDto = req.body
            const result = await userService.login(loginDto)
            setCookie(res, 'access_token', result.token)
            res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    result
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async profile(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user
            const result = await userService.showProfile(user)
            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    result
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async updateProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user
            const updateDto = req.body
            const result = await userService.updateProfile({ ...updateDto, ...user })
            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    result
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async verifyEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user
            const code = req.params.code
            const result = await userService.verifyEmail(code, user)
            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    result
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async updateEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user
            const { email, code } = req.body
            const result = await userService.updateEmail(code, email, user)
            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    result
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async sendEmailOtp(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user
            const method = req.query.method
            const result = await userService.sendVerifyEmailOtp(user, method as any)
            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    result
                }
            })
        } catch (error) {
            next(error)
        }
    }
}
export default new UserController()