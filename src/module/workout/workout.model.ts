import { DataTypes } from "sequelize";
import { sequelize } from "../../common/config/sequelize.config";
import { userModel } from "../user/user.model";
import { categoryModel } from "../category/category.model";

export const workoutModel = sequelize.define('workout',{
    id: {type: DataTypes.INTEGER , autoIncrement: true, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.STRING, defaultValue: ''},
    repeat: {type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: false,defaultValue: []},
    sets: {type: DataTypes.INTEGER, allowNull: false},
    categoryId: {type: DataTypes.INTEGER, allowNull: false},
    userId: {type: DataTypes.INTEGER},
})
userModel.hasOne(workoutModel,{foreignKey: 'userId'})
workoutModel.belongsTo(userModel)

categoryModel.hasOne(workoutModel,{foreignKey: 'categoryId', as: 'category'})
workoutModel.belongsTo(categoryModel)
workoutModel.sync({alter: true}).then(result => {
    console.log('db created: ',result);
})