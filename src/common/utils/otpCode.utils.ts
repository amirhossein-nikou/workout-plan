import crypto from 'crypto'
export function createOtpCode(){
    // return Math.floor(Math.random() * 100000) // sometime return less then 5 digit
    return crypto.randomInt(10000,99999).toString()
}