import dotenv from 'dotenv';
import path from "path";

dotenv.config({ path: path.resolve( `.env.${process.env.NODE_ENV}`) });

let port = process.env.PORT
let databaseUri = process.env.DATABASE_URI
let saltRounds = process.env.SALT_ROUNDS
let mood = process.env.MOOD
let accessUserSignature = process.env.ACCESS_USER_SIGNATURE
let refreshUserSignature = process.env.REFRESH_USER_SIGNATURE
let accessAdminSignature = process.env.ACCESS_ADMIN_SIGNATURE
let refreshAdminSignature = process.env.REFRESH_ADMIN_SIGNATURE

export const env ={
    port,
    databaseUri,
    saltRounds,
    mood,
    accessUserSignature,
    refreshUserSignature,
    accessAdminSignature,
    refreshAdminSignature
}