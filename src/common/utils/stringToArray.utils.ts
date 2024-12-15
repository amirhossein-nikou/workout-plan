import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";

export function stringToArray(field: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const value = req.body?.[field]
            if (value) {
                if (typeof value == 'string' && value.trim() !== '') {
                    if (value.indexOf(',') >= 0) {
                        req.body[field] = (value.split(','))?.map(item => {
                            if (!Number(item.trim())) throw new createHttpError.BadRequest('repeat items should be integer')
                            return Number(item.trim())
                        })
                    } else {
                        req.body[field] = [req.body[field]]
                    }
                }
                if (Array.isArray(value)) {
                    req.body[field] = value?.map(item => {
                        if (!Number(item.trim())) throw new createHttpError.BadRequest('repeat items should be integer')
                        return Number(item.trim())
                    })
                    req.body[field] = [... new Set(req.body[field])]
                }
            } else req.body[field] = []
            next()
        } catch (error) {
            next(error)
        }
    }
}