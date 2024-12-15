import { NextFunction, Request, Response } from "express";
import workoutService from "./workout.service";
import { StatusCodes } from "http-status-codes";

class WorkoutController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const createDto = req.body
            const user = req.user
            const message = await workoutService.create({ ...createDto, user })
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
    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user
            const workouts = await workoutService.getAll(user)
            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    workouts
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const id = req.params.id
            const user = req.user
            const workout = await workoutService.getById(id,user)
            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    workout: workout.dataValues
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async getByCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const category = req.params.category
            const user = req.user
            const workouts = await workoutService.getByCategory(category,user)
            res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    workouts
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body
            const user = req.user;
            const id = req.params.id
            const message = await workoutService.update({...body,user,id})
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
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user;
            const id = req.params.id
            const message = await workoutService.remove(id, user)
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

}

export default new WorkoutController()