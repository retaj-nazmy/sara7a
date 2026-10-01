import { env } from "../../config/env.service.js";
import bcrypt from "bcrypt"

export const generateHash = async ({plainText , salt = env.saltRounds})=>{

    let hashedData = await bcrypt.hash(plainText, Number(salt))
    return hashedData
}

export const compareHash = async ({plainText , hashedData})=>{
    let isMatched = await bcrypt.compare(plainText, hashedData)
    return isMatched
}