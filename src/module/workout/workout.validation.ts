import { body } from "express-validator";

export const workoutValidation = () => [
    body('name').isString().isLength({min: 2,max: 50}).trim().notEmpty(),
    body('description').optional().isString().isLength({min: 5,max: 100}).trim(),
    body('categoryId').isInt().trim().notEmpty(),
]
export const updateWorkoutValidation = () => [
    body('name').optional().isString().isLength({min: 2,max: 50}).trim().notEmpty(),
    body('description').optional().isString().isLength({min: 5,max: 100}).trim(),
    body('categoryId').optional().isInt().trim().notEmpty(),
]