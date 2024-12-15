import { validationResult } from "express-validator";
export function validationResultMiddleware(req, res, next) {
    const error = validationResult(req)
    const obj = {}
    // @ts-ignore
    error?.errors.forEach(err => {
        obj[err.path] = err.msg
    })
    if (Object.keys(obj).length > 0) {
        throw {
            status: 400,
            error: obj,
            message: "Validation Error"
        }
    }
    next()
}