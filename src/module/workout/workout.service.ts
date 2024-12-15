import createHttpError from "http-errors";
import { categoryModel } from "../category/category.model";
import { workoutModel } from "./workout.model";
import { userModel } from "../user/user.model";
import categoryService from "../category/category.service";

class WorkoutService {
    async create(createDto) {
        const { name, description, categoryId, user, repeat } = createDto
        await categoryService.getOne(categoryId)
        await workoutModel.create({
            name,
            description,
            categoryId,
            userId: user.id,
            repeat,
            sets: repeat.length
        })
        return 'workout created successfully'
    }
    async getAll(user) {
        const workouts = await workoutModel.findAll({
            where: {
                userId: user.id
            },
            include: [
                {
                    model: categoryModel,
                    as: 'category',
                    attributes: ['name']
                },
            ]
        })
        return workouts
    }
    async getById(id, user) {
        const workout = await workoutModel.findOne({
            include: [
                {
                    model: categoryModel,
                    as: "category",
                    attributes: ['name']
                },
                {
                    model: userModel,
                    as: "user",
                    attributes: ['firstname', 'lastname', 'email']
                }
            ],
            where: {
                id,
                userId: user.id
            }
        })
        if (!workout) throw new createHttpError.NotFound('workout not found')
        return workout
    }
    async getByCategory(category: string, user) {
        const workouts = await workoutModel.findAll({
            include: [
                {
                    model: categoryModel,
                    as: "category",
                    attributes: ['name']
                },
                {
                    model: userModel,
                    as: "user",
                    attributes: ['firstname', 'lastname', 'email']
                }
            ],
            where: {
                userId: user.id,
                '$category.name$': category
            }
        })
        if (!workouts) throw new createHttpError.NotFound('workout not found with this category')
        return workouts
    }
    async update(updateDto) {
        let { id, name, description, user, categoryId, repeat } = updateDto
        if(categoryId) await categoryService.getOne(categoryId)
        const workout = await this.getById(id, user)
        if(repeat.length == 0){
            repeat = workout.dataValues.repeat
        }
        workout.update({
            name,
            description,
            categoryId,
            sets: repeat.length,
            repeat
        })
        return 'updated successfully'
    }
    async remove(id, user) {
        const workout = await this.getById(id, user)
        workout.destroy()
        return 'workout removed'
    }
}

export default new WorkoutService()