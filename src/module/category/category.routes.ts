import { Router } from "express";
import { categoryValidation } from "./category.validation";
import { validationResultMiddleware } from "../../common/middlewares/validation.middleware";
import categoryController from "./category.controller";

const CategoryRoutes = Router()

CategoryRoutes.post('/create', categoryValidation(), validationResultMiddleware, categoryController.create)
CategoryRoutes.get('/list',categoryController.getAll)
CategoryRoutes.get('/:search',categoryController.getOne)
CategoryRoutes.delete('/remove/:id', categoryController.delete)
CategoryRoutes.put('/update/:id', categoryValidation(), validationResultMiddleware, categoryController.update)
export default CategoryRoutes