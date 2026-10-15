import dotenv from 'dotenv';
import path from "path";

dotenv.config({ path: path.resolve( `.env.${process.env.NODE_ENV}`) });

const port = process.env.PORT
const databaseUri = process.env.DATABASE_URI
const saltRounds = process.env.SALT_ROUNDS
const mood = process.env.MOOD
const accessUserSignature = process.env.ACCESS_USER_SIGNATURE
const refreshUserSignature = process.env.REFRESH_USER_SIGNATURE
const accessAdminSignature = process.env.ACCESS_ADMIN_SIGNATURE
const refreshAdminSignature = process.env.REFRESH_ADMIN_SIGNATURE
const emailUser = process.env.EMAIL
const appPassword = process.env.APP_PASSWORD

export const env ={
    port,
    databaseUri,
    saltRounds,
    mood,
    accessUserSignature,
    refreshUserSignature,
    accessAdminSignature,
    refreshAdminSignature,
    emailUser,
    appPassword
}