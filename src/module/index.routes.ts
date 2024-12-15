import { Router } from "express";
import UserRoutes from "./user/user.routes";
import CategoryRoutes from "./category/category.routes";
import { AuthGuard } from "../common/middlewares/auth.guard";
import WorkoutRoutes from "./workout/workout.routes";

const IndexRouter = Router()

IndexRouter.use('/user', UserRoutes)
IndexRouter.use('/category',AuthGuard, CategoryRoutes)
IndexRouter.use('/workout',AuthGuard, WorkoutRoutes)

export default IndexRouter