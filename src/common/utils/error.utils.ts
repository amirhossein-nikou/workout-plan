import { NextFunction, Request, Response, } from "express"
import httpError from "http-errors"

export function NotfoundError(req: Request, res: Response, next: NextFunction) {
    res.json(new httpError.NotFound('route not found'))
}

export function ErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    const serverError = httpError.InternalServerError()
    const status = err?.status || err?.statusCode || serverError.statusCode
    const message = err?.message || serverError.message
    res.status(status).json({
        errors: {
            status,
            message,
            error: err?.error
        }
    })
}