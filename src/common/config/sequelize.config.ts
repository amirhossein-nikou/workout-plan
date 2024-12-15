import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('postgres://postgres:amir1234nikou@localhost:5432/workout') 

export async function connectionTest(){
    try {
        await sequelize.authenticate()
        console.log('connected to database');
    } catch (error) {
        console.log('connection failed : ', error.message);
    }
}
connectionTest()