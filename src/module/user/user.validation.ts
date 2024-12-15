import { body } from 'express-validator'
import httpError from "http-errors"
export const registerValidation = () => [
    body('firstname').isString().isLength({min: 3,max: 50}).trim().notEmpty(),
    body('lastname').isString().isLength({min: 3,max: 50}).trim().notEmpty(),
    body('email')
    .isEmail({host_whitelist: ["gmail.com", "yahoo.com", "outlook.com", "aol.com", "mail.com", "icloud.com", "fastmail.com"]})
    .trim().notEmpty().toLowerCase(),
    body('password').isString().isLength({min:8,max:64})
    .withMessage('password should be more than 8 and less than 68 char')
    .trim().notEmpty(),
    body("confirmPassword").custom((value, { req }) => {
        if (value !== req.body?.password) {
            throw new httpError.BadRequest('password and confirm password should have same values')
        }
        return true
    })
]
export const loginValidation = () => [
    body('email').isEmail().trim().notEmpty(),
    body('password').isString().trim().notEmpty(),
]