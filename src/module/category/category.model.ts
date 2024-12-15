import { DataTypes } from "sequelize";
import { sequelize } from "../../common/config/sequelize.config";
import { workoutModel } from "../workout/workout.model";


export const categoryModel = sequelize.define('category',{
    id: {type: DataTypes.INTEGER,autoIncrement: true,primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    workoutId: {type: DataTypes.INTEGER},
    categoryId: {type: DataTypes.INTEGER}
})
categoryModel.sync({alter: true})