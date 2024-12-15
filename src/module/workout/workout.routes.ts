import { Router } from "express"
import workoutController from "./workout.controller"
import { updateWorkoutValidation, workoutValidation } from "./workout.validation"
import { validationResultMiddleware } from "../../common/middlewares/validation.middleware"
import { stringToArray } from "../../common/utils/stringToArray.utils"

const WorkoutRoutes = Router()

WorkoutRoutes.post('/create',stringToArray('repeat'), workoutValidation(), validationResultMiddleware, workoutController.create)
WorkoutRoutes.get('/list', workoutController.getAll)
WorkoutRoutes.get('/:id', workoutController.getById)
WorkoutRoutes.get('/byCategory/:category', workoutController.getByCategory)
WorkoutRoutes.delete('/remove/:id', workoutController.delete)
WorkoutRoutes.put('/update/:id',stringToArray('repeat'), updateWorkoutValidation(), validationResultMiddleware, workoutController.update)
export default WorkoutRoutes