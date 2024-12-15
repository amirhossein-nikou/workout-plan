import createHttpError from "http-errors"
import { categoryModel } from "./category.model"
import { Op } from "sequelize"

class CategoryService {
    async create(createDto) {
        const { name } = createDto
        await this.checkExistsCategoryByName(name)
        await categoryModel.create({ name })
        return 'category created successfully'
    }
    async getAll() {
        const categories = await categoryModel.findAll()
        return categories
    }
    async getOne(search: string) {
        let where: object = {};
        if(Number(search)){
            where = {
                where: {
                    id: search
                }
            }
        }else{
            where = {
                where: {
                    name: search
                }
            }
        }
        const category = await categoryModel.findOne(where)
        if (!category) throw new createHttpError.NotFound('category not found')
        return category.dataValues
    }
    async delete(id) {
        const category = await this.getCategoryById(id);
        category.destroy()
        return 'category removed'
    }
    async update(updateDto) {
        const {id , name} = updateDto
        await this.checkExistsCategoryByName(name)
        const category = await this.getCategoryById(id);
        category.update({name})
        return 'category updated'
    }
    // utils 

    private async getCategoryById(id) {
        const category = await categoryModel.findOne({ where: { id } })
        if (!category) throw new createHttpError.NotFound('category not found')
        return category
    }
    private async checkExistsCategoryByName(name: string) {
        const category = await categoryModel.findOne({ where: { name } })
        if (category) throw new createHttpError.Conflict('category already exists')
        return true
    }
}

export default new CategoryService()