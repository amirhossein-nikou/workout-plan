import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

export function AuthGuard(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies?.['access_token']
        if (!token) throw new createHttpError.Unauthorized('please login to your account first')
        const data = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
        if (typeof data == 'object' && 'id' in data) {
            req.user = {id: data.id}
            next()
        }else{
            throw new createHttpError.Unauthorized('please login to your account first')
        }
    } catch (error) {
        next(error)
    }
}

