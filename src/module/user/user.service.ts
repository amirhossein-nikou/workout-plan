import bcrypt from 'bcrypt';
import httpError from "http-errors";
import { otpModel, userModel } from "./user.model";
import jwt from 'jsonwebtoken'
import { createOtpCode } from '../../common/utils/otpCode.utils';
import createHttpError from 'http-errors';
type AccessTokenPayload = {
    email: string,
    id: number
}
class UserService {

    async register(registerDto) {
        const { firstname, lastname, email, password } = registerDto;
        await this.checkExistsEmail(email)
        await userModel.create({
            firstname,
            lastname,
            email,
            password: bcrypt.hashSync(password, 10)
        })
        return 'user created'
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = (await this.getUserByEmail(email)).dataValues;
        if (!bcrypt.compareSync(password, user.password)) {
            throw new httpError.Unauthorized('username or password is incorrect')
        }
        const token = this.signAccessToken({ email: user.email, id: user.id })
        return {
            message: 'logged in successfully',
            token
        }
    }

    async showProfile(user) {
        const result = await userModel.findOne({
            where: {
                id: user.id
            },
            attributes: { exclude: ['password', 'oldEmail'] }
        })
        if (!user) throw new httpError.Conflict('user not found')
        return result
    }

    async updateProfile(updateDto) {
        const { firstname, lastname, id} = updateDto
        let msg: string = 'user updated';
        let password: string;
        const user = await this.getUserById(id);
        // create route for change password with require field currentPassword,newPassword,confirmPassword
        // if(currentPassword && newPassword && confirmPassword){
        //     if(!bcrypt.compareSync(currentPassword,user.dataValues.password))
        //         throw new createHttpError.BadRequest('current password not match')
        //     if(bcrypt.compareSync(newPassword,user.dataValues.password))
        //         throw new createHttpError.BadRequest('this password used before')
        //     if(newPassword !== confirmPassword)
        //         throw new createHttpError.BadRequest('password and confirm password should be same')
        // }
        user.update({
            firstname,
            lastname
        })
        return msg
    }
    async verifyEmail(code: string, userInfo) {
        const { id } = userInfo
        const otp = await otpModel.findOne({ where: { userId: id, method: "VERIFY" } })
        if (!otp) throw new createHttpError.NotFound('otp not found for this user please resend code')
        const user = await this.getUserById(id);
        const now = Date.now()
        if (code !== otp.dataValues.code && user.dataValues.id !== otp.dataValues.userId) {
            throw new createHttpError.BadRequest('wrong code try again')
        }
        if (otp.dataValues.expiresIn <= now) throw new createHttpError.BadRequest('code expires')
        if (user.dataValues.verifyEmail) throw new createHttpError.BadRequest('email already verified')
        await user.update({
            verifyEmail: true
        })
        return 'email verify successfully'
    }
    async sendVerifyEmailOtp(userInfo, method: string) {
        const { id } = userInfo
        if (!method) throw new createHttpError.BadRequest('cant find method for send otp')
        const user = (await this.getUserById(id)).dataValues
        if (method === 'VERIFY' && user.verifyEmail) throw new createHttpError.BadRequest('email already verified')
        // send otp to authenticated user email user.email
        const code = await this.createOtp(id, method)
        return {
            message: 'otp send successfully',
            code
        }
    }
    async updateEmail(code: string, newEmail: string, userInfo) {
        const { id } = userInfo
        await this.checkExistsEmail(newEmail)
        const user = await this.getUserById(id);
        const otp = await otpModel.findOne({ where: { userId: id, method: "UPDATE" } })
        const now = Date.now()
        if (!otp) throw new createHttpError.NotFound('otp not found for this user please resend code')
        console.log(otp.dataValues.code);
        if (code != otp.dataValues.code) {
            throw new createHttpError.BadRequest('wrong code try again')
        }
        if (otp.dataValues.expiresIn <= now) throw new createHttpError.BadRequest('code expires')
        if (newEmail === user.dataValues.email) return 'user updated'
        await user.update({
            oldEmail: user.dataValues.email,
            email: newEmail,
            verifyEmail: false
        })
        await otp.destroy()
        return 'email update successfully'
    }
    // need change password module
    // utils
    async createOtp(id, method: string) {
        const otp = await otpModel.findOne({ where: { userId: id, method } })
        const code = createOtpCode()
        const now = Date.now()
        if (otp) {
            if (otp.dataValues.expiresIn > now) throw new createHttpError.BadRequest('code not expired yet')
            await otp.update({
                code,
                expiresIn: now + (1000 * 60 * 2)
            })
        } else {
            otpModel.create({
                code,
                expiresIn: now + (1000 * 60 * 2),
                userId: id,
                method
            })
        }
        return code
    }

    private async checkExistsEmail(email: string) {
        const user = await userModel.findOne({
            where: {
                email
            }
        })
        if (user) throw new httpError.Conflict('this email is already exists')
        return true
    }
    private async getUserByEmail(email) {
        const user = await userModel.findOne({
            where: {
                email: email.toLowerCase()
            }
        })
        if (!user) throw new httpError.Conflict('user not found')
        return user
    }
    private async getUserById(id) {
        const user = await userModel.findOne({
            where: {
                id
            }
        })
        if (!user) throw new httpError.Conflict('user not found')
        return user
    }
    signAccessToken(payload: AccessTokenPayload): string {
        const token = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
            expiresIn: '1h'
        })
        return token
    }
}

export default new UserService()