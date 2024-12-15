import { NextFunction, Request, Response } from "express";
import categoryService from "./category.service";
import { StatusCodes } from "http-status-codes";
class CategoryController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const {name} = req.body
            const result = await categoryService.create({name})
            res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    message: result
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await categoryService.getAll()
            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    categories
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getOne(req: Request, res: Response, next: NextFunction) {
        try {
            const search = req.params.search
            const category = await categoryService.getOne(search)
            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    category
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const message = await categoryService.delete(id)
            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    message
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const {name} = req.body
            const id = req.params.id
            const message = await categoryService.update({name,id})
            res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data: {
                    message
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

export default new CategoryController()