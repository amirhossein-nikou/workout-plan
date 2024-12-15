import { body } from "express-validator";

export const categoryValidation = () => [
    body('name').isString().isLength({min: 2,max: 50}).trim().notEmpty(),
]