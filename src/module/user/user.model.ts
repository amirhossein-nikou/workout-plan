import { sequelize } from "../../common/config/sequelize.config";
import { DataTypes } from "sequelize";
export const userModel = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    firstname: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false},
    oldEmail: { type: DataTypes.STRING},
    verifyEmail: { type: DataTypes.BOOLEAN, defaultValue: false},
    password: { type: DataTypes.STRING, allowNull: false},
    birthday: { type: DataTypes.DATE},
})
export const otpModel = sequelize.define('otp', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    expiresIn: { type: DataTypes.DATE, allowNull: false },
    code: { type: DataTypes.INTEGER, allowNull: false },
    method:{ type: DataTypes.STRING, allowNull: false},
    userId: { type: DataTypes.INTEGER}
}, { createdAt: false, updatedAt: false })

userModel.hasOne(otpModel);
otpModel.belongsTo(userModel, {onDelete: "CASCADE"});
userModel.sync({ alter: true }).then(result => {
    console.log('db created: ', result);
})
otpModel.sync({ alter: true }).then(result => {
    console.log('db created: ', result);
})